async function login(email, password) {
  const data = await apiFetch(CONFIG.ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const accessToken = data?.accessToken || data?.token;
  const refreshToken = data?.refreshToken || '';

  if (!accessToken || !isValidJwt(accessToken)) {
    throw new Error('Valid authentication token was not returned by the server.');
  }

  saveTokens(accessToken, refreshToken);
  setCurrentLocalUser({ email, firstName: email.split('@')[0] });
  return data;
}

document.getElementById('login-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    await login(email, password);
    window.location.href = 'menu.html';
  } catch (err) {
    console.error('Login error:', err);
    showToast(err.message || 'Invalid email or password.', 'error');
  }
});

function openForgotModal(e) {
  e.preventDefault();
  const modal = document.getElementById('forgot-modal');
  if (modal) modal.style.display = 'flex';
}

function closeForgotModal() {
  const modal = document.getElementById('forgot-modal');
  if (modal) modal.style.display = 'none';
}

async function sendForgotCode() {
  const email = document.getElementById('reset-email').value.trim();
  if (!email) {
    showToast('Please enter your email address.', 'warning', 'Missing Email');
    return;
  }
  try {
    await apiFetch(`${CONFIG.ENDPOINTS.FORGOT_PASSWORD}/${encodeURIComponent(email)}`, {
      method: 'POST'
    });
    showToast('Reset code sent to your email.', 'success');
  } catch (err) {
    console.error('Forgot password error:', err);
    showToast(err.message, 'error');
  }
}

async function submitPasswordReset() {
  const token = document.getElementById('reset-token').value.trim();
  const newPassword = document.getElementById('reset-new-password').value;

  if (!token || !newPassword) {
    showToast('Please enter the reset token and new password.', 'warning', 'Validation');
    return;
  }

  if (!validatePassword(newPassword)) {
    showToast(
      'New password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.',
      'warning',
      'Weak Password'
    );
    return;
  }

  try {
    await apiFetch(CONFIG.ENDPOINTS.RESET_PASSWORD, {
      method: 'PUT',
      body: JSON.stringify({ token, newPassword })
    });
    showToast('Password updated successfully!', 'success');
    closeForgotModal();
  } catch (err) {
    console.error('Reset password error:', err);
    showToast(err.message, 'error');
  }
}