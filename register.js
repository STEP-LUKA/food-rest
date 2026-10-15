let pendingVerificationEmail = '';
let pendingPassword = '';

document.getElementById('reg-password')?.addEventListener('input', e => {
  const val = e.target.value;
  const lenEl = document.getElementById('rule-len');
  const caseEl = document.getElementById('rule-case');
  const numEl = document.getElementById('rule-num');
  const specEl = document.getElementById('rule-spec');

  if (lenEl) lenEl.style.color = val.length >= 8 ? '#15803d' : '#64748b';
  if (caseEl) caseEl.style.color = (/[a-z]/.test(val) && /[A-Z]/.test(val)) ? '#15803d' : '#64748b';
  if (numEl) numEl.style.color = /\d/.test(val) ? '#15803d' : '#64748b';
  if (specEl) specEl.style.color = /[^A-Za-z0-9]/.test(val) ? '#15803d' : '#64748b';
});

document.getElementById('register-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const firstName = document.getElementById('reg-firstname').value.trim();
  const lastName = document.getElementById('reg-lastname').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const submitBtn = document.getElementById('reg-submit-btn') || e.target.querySelector('button[type="submit"]');

  if (!validatePassword(password)) {
    showToast(
      'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.',
      'warning',
      'Weak Password'
    );
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
  }

  try {
    const data = await apiFetch(CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    setCurrentLocalUser({ firstName, lastName, email });
    pendingVerificationEmail = email;
    pendingPassword = password;

    if (data?.accessToken && isValidJwt(data.accessToken)) {
      saveTokens(data.accessToken, data.refreshToken || '');
      window.location.href = 'menu.html';
      return;
    }

    const modal = document.getElementById('verify-modal');
    if (modal) {
      modal.style.display = 'flex';
      showToast('Account created! Please check your email for the verification code.', 'success');
    } else {
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error('Register error:', err);
    showToast(err.message, 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
    }
  }
});

async function submitEmailVerification() {
  const code = document.getElementById('verify-code-input').value.trim();
  if (!code) {
    showToast('Please enter the verification code.', 'warning', 'Verification');
    return;
  }

  try {
    const data = await apiFetch(CONFIG.ENDPOINTS.VERIFY_EMAIL, {
      method: 'PUT',
      body: JSON.stringify({
        email: pendingVerificationEmail,
        code
      })
    });

    const accessToken = data?.accessToken || data?.token;
    const refreshToken = data?.refreshToken || '';

    if (accessToken && isValidJwt(accessToken)) {
      saveTokens(accessToken, refreshToken);
      showToast('Email verified successfully!', 'success');
      window.location.href = 'menu.html';
      return;
    }

    if (pendingVerificationEmail && pendingPassword) {
      const loginData = await apiFetch(CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          email: pendingVerificationEmail,
          password: pendingPassword
        })
      });
      if (loginData?.accessToken && isValidJwt(loginData.accessToken)) {
        saveTokens(loginData.accessToken, loginData.refreshToken || '');
        window.location.href = 'menu.html';
        return;
      }
    }

    showToast('Email verified! Please sign in.', 'success');
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Verification error:', err);
    showToast(err.message, 'error');
  }
}

async function resendVerificationCode() {
  if (!pendingVerificationEmail) {
    pendingVerificationEmail = document.getElementById('reg-email')?.value.trim() || '';
  }
  if (!pendingVerificationEmail) {
    showToast('Email address is missing.', 'warning');
    return;
  }

  try {
    await apiFetch(`${CONFIG.ENDPOINTS.RESEND_VERIFY}/${encodeURIComponent(pendingVerificationEmail)}`, {
      method: 'POST'
    });
    showToast('Verification code resent to your email!', 'success');
  } catch (err) {
    console.error('Resend verification error:', err);
    showToast(err.message, 'error');
  }
}