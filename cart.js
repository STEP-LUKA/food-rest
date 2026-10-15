let cachedUserProfile = {};

async function initCartAndProfilePage() {
  const cartContainer = document.getElementById('cart-items-container');
  if (!cartContainer) return;

  const token = await ensureAccessToken();
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  await loadCartItems();
  await loadUserProfile();
}

async function loadCartItems() {
  const container = document.getElementById('cart-items-container');
  const totalEl = document.getElementById('cart-total-price');
  const badgeEl = document.getElementById('cart-badge');
  if (!container) return;

  try {
    const data = await apiFetch(CONFIG.ENDPOINTS.CART_GET, { method: 'GET' }, true);
    const items = Array.isArray(data) ? data : (data?.items || []);

    localStorage.setItem('foodie_cart', JSON.stringify(items));

    if (badgeEl) {
      const totalCount =
        data?.totalItems !== undefined
          ? Number(data.totalItems)
          : items.reduce((acc, i) => acc + Number(i.quantity || 1), 0);
      badgeEl.textContent = totalCount;
      badgeEl.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    }

    if (items.length === 0) {
      container.innerHTML = `<p style="color:#6b7280; padding: 16px 0;">Your cart is empty.</p>`;
      if (totalEl) totalEl.textContent = '$0.00';
      return;
    }

    let calculatedSum = 0;
    container.innerHTML = items
      .map(item => {
        const prod = item.product || PRODUCTS_DATA.find(p => p.id === item.productId) || item;
        const itemId = Number(item.id);
        const qty = Number(item.quantity || 1);
        const price = Number(prod.price || 0);
        const safeName = escapeHtml(prod.name || 'Dish');
        calculatedSum += price * qty;

        return `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <h4>${safeName}</h4>
              <p>$${price.toFixed(2)} × ${qty}</p>
            </div>
            <div class="cart-item-actions">
              <button class="btn-clear" style="width:auto;" onclick="updateCartItemQty(${itemId}, ${qty - 1})">-</button>
              <span>${qty}</span>
              <button class="btn-clear" style="width:auto;" onclick="updateCartItemQty(${itemId}, ${qty + 1})">+</button>
              <button class="btn-clear" style="width:auto; color:#d93025;" onclick="removeCartItem(${itemId})">Remove</button>
            </div>
          </div>
        `;
      })
      .join('');

    const finalTotal = data?.totalPrice !== undefined ? Number(data.totalPrice) : calculatedSum;
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  } catch (err) {
    console.error('Error loading cart:', err);
    container.innerHTML = `<p style="color:#6b7280; padding: 16px 0;">Your cart is empty.</p>`;
    if (totalEl) totalEl.textContent = '$0.00';
  }
}

async function updateCartItemQty(itemId, quantity) {
  if (quantity < 1) {
    await removeCartItem(itemId);
    return;
  }
  try {
    await apiFetch(
      CONFIG.ENDPOINTS.CART_EDIT,
      {
        method: 'PUT',
        body: JSON.stringify({
          itemId: Number(itemId),
          quantity: Number(quantity)
        })
      },
      true
    );
    await loadCartItems();
  } catch (err) {
    console.error('Update cart quantity error:', err);
    showToast(err.message, 'error');
  }
}

async function removeCartItem(itemId) {
  try {
    await apiFetch(
      `${CONFIG.ENDPOINTS.CART_REMOVE}/${encodeURIComponent(itemId)}`,
      { method: 'DELETE' },
      true
    );
    await loadCartItems();
  } catch (err) {
    console.error('Remove cart item error:', err);
    showToast(err.message, 'error');
  }
}

async function checkoutCart() {
  try {
    await apiFetch(CONFIG.ENDPOINTS.CART_CHECKOUT, { method: 'POST' }, true);
    localStorage.removeItem('foodie_cart');
    showToast('Order placed successfully!', 'success');
    await loadCartItems();
  } catch (err) {
    console.error('Checkout error:', err);
    showToast(err.message, 'error');
  }
}

async function loadUserProfile() {
  try {
    const profile = await apiFetch(CONFIG.ENDPOINTS.USER_PROFILE, { method: 'GET' }, true);
    if (profile) {
      cachedUserProfile = profile;
      setCurrentLocalUser(profile);
      document.getElementById('prof-firstname').value = profile.firstName || '';
      document.getElementById('prof-lastname').value = profile.lastName || '';
      document.getElementById('prof-email').value = profile.email || '';
      document.getElementById('prof-address').value = profile.address || '';
      document.getElementById('prof-age').value =
        profile.age !== null && profile.age !== undefined && profile.age > 0 ? profile.age : '';
    }
  } catch (err) {
    console.warn('Could not load full profile, trying /api/users/me:', err.message);
    try {
      const me = await apiFetch(CONFIG.ENDPOINTS.USER_ME, { method: 'GET' }, true);
      if (me) {
        cachedUserProfile = me;
        document.getElementById('prof-firstname').value = me.firstName || '';
        document.getElementById('prof-lastname').value = me.lastName || '';
        document.getElementById('prof-email').value = me.email || '';
      }
    } catch (_) {}
  }
}

document.getElementById('profile-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    firstName: document.getElementById('prof-firstname').value.trim(),
    lastName: document.getElementById('prof-lastname').value.trim(),
    phoneNumber: cachedUserProfile.phoneNumber || '',
    picture: cachedUserProfile.picture || '',
    address: document.getElementById('prof-address').value.trim(),
    age: Number(document.getElementById('prof-age').value) || 0
  };

  try {
    await apiFetch(
      CONFIG.ENDPOINTS.USER_EDIT,
      {
        method: 'PUT',
        body: JSON.stringify(payload)
      },
      true
    );
    cachedUserProfile = { ...cachedUserProfile, ...payload };
    setCurrentLocalUser(cachedUserProfile);
    const loginLink = document.getElementById('nav-login-link');
    if (loginLink && payload.firstName) {
      loginLink.textContent = payload.firstName;
    }
    showToast('Profile updated successfully!', 'success');
  } catch (err) {
    console.error('Profile edit error:', err);
    showToast(err.message, 'error');
  }
});

document.getElementById('change-pass-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;

  if (!validatePassword(newPassword)) {
    showToast(
      'New password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.',
      'warning',
      'Weak Password'
    );
    return;
  }

  try {
    await apiFetch(
      CONFIG.ENDPOINTS.USER_CHANGE_PASS,
      {
        method: 'PUT',
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword: newPassword
        })
      },
      true
    );
    showToast('Password changed successfully!', 'success');
    e.target.reset();
  } catch (err) {
    console.error('Change password error:', err);
    showToast(err.message, 'error');
  }
});

async function deleteUserAccount() {
  if (!confirm('Are you sure you want to delete your account?')) return;
  try {
    await apiFetch(CONFIG.ENDPOINTS.USER_DELETE, { method: 'DELETE' }, true);
    logoutUser();
  } catch (err) {
    console.error('Delete account error:', err);
    showToast(err.message, 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCartAndProfilePage();
});