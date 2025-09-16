// Frontend authentication logic for D.Solution
const API_BASE = 'http://localhost:5000/api/auth';

// Load token from localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

// Set token to localStorage
function setToken(token) {
    localStorage.setItem('authToken', token);
}

// Clear token from localStorage
function clearToken() {
    localStorage.removeItem('authToken');
}

// Handle OAuth redirect from URL (shared function for login flows, e.g., Google OAuth)
function handleOAuthRedirect() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (error === 'verification_failed') {
            console.error('Verification failed. Please try registering again or contact support.');
            window.history.replaceState(null, null, window.location.pathname);
            return;
        }

        if (!token || typeof token !== 'string' || token.trim() === '') {
            console.error('Invalid or missing token in URL. Please log in again.');
            window.history.replaceState(null, null, window.location.pathname);
            return;
        }

        setToken(token);
        
        // Clean URL to remove sensitive token from history
        window.history.replaceState(null, null, window.location.pathname);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error handling OAuth redirect:', error);
        window.history.replaceState(null, null, window.location.pathname);
    }
}

// Check if user is authenticated
function isAuthenticated() {
    const token = getToken();
    return !!token;
}

// Show login form
function showLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) form.addEventListener('submit', handleLogin);
}

// Show register form
function showRegisterForm() {
    const form = document.getElementById('registerForm');
    console.log('Register form found:', !!form); // Debug: Check if form is detected
    if (form) {
        console.log('Attaching register submit handler'); // Debug: Confirm handler attachment
        form.addEventListener('submit', handleRegister);
    } else {
        console.error('Register form not found - check HTML'); // Debug: If form missing
    }
}

// Enhanced login handler with validation and loading
async function handleLogin(e) {
    e.preventDefault();
    MessageUtils.clearMessages();

    const emailEl = document.getElementById('loginEmail');
    const passwordEl = document.getElementById('loginPassword');
    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value : '';

    // Client validation
    const emailError = ValidationUtils.getValidationError('email', email);
    if (emailError) {
        MessageUtils.showError('authError', emailError);
        return;
    }
    if (!password) {
        MessageUtils.showError('authError', 'Password is required.');
        return;
    }

    LoadingUtils.showLoading('loginBtn', 'loginLoading');

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            AuthUtils.setToken(data.token);
            const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
            if (modal) modal.hide();
            window.location.href = 'dashboard.html';
        } else {
            MessageUtils.showError('authError', data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        MessageUtils.showError('authError', 'Network error. Please check your connection and try again.');
    } finally {
        LoadingUtils.hideLoading('loginBtn', 'loginLoading');
    }
}

// Enhanced registration handler with validation and loading
async function handleRegister(e) {
    e.preventDefault();
    MessageUtils.clearMessages();

    const firstNameEl = document.getElementById('regFirstName');
    const lastNameEl = document.getElementById('regLastName');
    const emailEl = document.getElementById('regEmail');
    const passwordEl = document.getElementById('regPassword');
    const firstName = firstNameEl ? firstNameEl.value.trim() : '';
    const lastName = lastNameEl ? lastNameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value : '';

    // Client validation
    const firstNameError = ValidationUtils.getValidationError('firstName', firstName);
    if (firstNameError) {
        MessageUtils.showError('authError', firstNameError);
        return;
    }
    const lastNameError = ValidationUtils.getValidationError('lastName', lastName);
    if (lastNameError) {
        MessageUtils.showError('authError', lastNameError);
        return;
    }
    const emailError = ValidationUtils.getValidationError('email', email);
    if (emailError) {
        MessageUtils.showError('authError', emailError);
        return;
    }
    const passwordError = ValidationUtils.getValidationError('password', password);
    if (passwordError) {
        MessageUtils.showError('authError', passwordError);
        return;
    }

    LoadingUtils.showLoading('registerBtn', 'registerLoading');

    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            MessageUtils.showMessage('authMessage', 'Registration successful! A verification email has been sent. Please check your inbox.<br><button id="resendVerification" class="btn btn-link p-0">Resend Email</button>');
            
            // Switch to login tab
            const loginTab = document.getElementById('login-tab');
            if (loginTab && window.bootstrap?.Tab) {
                new window.bootstrap.Tab(loginTab).show();
            }
            
            // Clear form
            e.target.reset();
            document.getElementById('regEmail').value = email; // Pre-fill email for login

            // Add resend event listener
            const resendBtn = document.getElementById('resendVerification');
            if (resendBtn && !resendBtn.dataset.listenerAdded) {
                resendBtn.addEventListener('click', handleResendVerification);
                resendBtn.dataset.listenerAdded = 'true';
            }
        } else {
            MessageUtils.showError('authError', data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        MessageUtils.showError('authError', 'Network error during registration. Please check your connection.');
    } finally {
        LoadingUtils.hideLoading('registerBtn', 'registerLoading');
    }
}

// Enhanced forgot password handler
async function handleForgotPassword(e) {
    e.preventDefault();
    const emailEl = document.getElementById('email');
    const email = emailEl ? emailEl.value.trim() : '';

    if (!ValidationUtils.validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || 'Password reset email sent. Check your inbox.');
        } else {
            alert(data.message || 'Failed to send reset link.');
        }
    } catch (error) {
        alert('Error sending reset email: ' + error.message);
    }
}

// Enhanced profile update handler
async function handleProfileUpdate(e) {
    e.preventDefault();
    const token = AuthUtils.getToken();
    if (!token) {
        alert('Authentication required. Please log in again.');
        return;
    }

    const firstNameEl = document.getElementById('firstName');
    const lastNameEl = document.getElementById('lastName');
    const emailEl = document.getElementById('email');
    const firstName = firstNameEl ? firstNameEl.value.trim() : '';
    const lastName = lastNameEl ? lastNameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';

    // Validation
    if (!ValidationUtils.validateName(firstName)) {
        alert('First name must be at least 2 characters.');
        return;
    }
    if (!ValidationUtils.validateName(lastName)) {
        alert('Last name must be at least 2 characters.');
        return;
    }
    if (!ValidationUtils.validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName, lastName, email })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Profile updated successfully');
            const modal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
            if (modal) modal.hide();
        } else {
            alert(data.message || 'Profile update failed');
        }
    } catch (error) {
        alert('Error updating profile: ' + error.message);
    }
}

// Logout handler
function handleLogout() {
    AuthUtils.clearToken();
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) accountBtn.textContent = 'Account';
    const modal = bootstrap.Modal.getInstance(document.getElementById('accountModal'));
    if (modal) modal.hide();
    window.location.href = 'index.html';
}

// Load user data on dashboard
async function loadUserData() {
    const token = AuthUtils.getToken();
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (response.ok) {
            const userNameEl = document.getElementById('userName');
            const userEmailEl = document.getElementById('userEmail');
            if (userNameEl) userNameEl.textContent = `${data.user.firstName} ${data.user.lastName}`;
            if (userEmailEl) userEmailEl.textContent = data.user.email;
        } else {
            AuthUtils.clearToken();
            window.location.href = 'index.html';
        }
    } catch (error) {
        AuthUtils.clearToken();
        window.location.href = 'index.html';
    }
}

// Enhanced resend verification
async function handleResendVerification(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value || document.getElementById('regEmail')?.value || '';
    if (!email || !ValidationUtils.validateEmail(email)) {
        MessageUtils.showError('authError', 'Please enter a valid email address.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/resend-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            MessageUtils.showMessage('authMessage', data.message + '<br><button id="resendVerification" class="btn btn-link p-0">Resend Email</button>');
            const newResendBtn = document.getElementById('resendVerification');
            if (newResendBtn && !newResendBtn.dataset.listenerAdded) {
                newResendBtn.addEventListener('click', handleResendVerification);
                newResendBtn.dataset.listenerAdded = 'true';
            }
        } else {
            MessageUtils.showError('authError', data.message || 'Failed to resend verification email.');
        }
    } catch (error) {
        MessageUtils.showError('authError', 'Error resending email. Please try again.');
    }
}

// Initialize auth functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;

    // Handle account button
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn && !currentPath.includes('dashboard') && !currentPath.includes('forgot-password')) {
        if (AuthUtils.isAuthenticated()) {
            accountBtn.textContent = 'Dashboard';
            accountBtn.addEventListener('click', () => window.location.href = 'dashboard.html');
        } else {
            accountBtn.textContent = 'Login';
            accountBtn.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('authModal'));
                if (modal) {
                    modal.show();
                } else {
                    window.location.href = 'index.html'; // Fallback
                }
            });
        }
    }

    // Attach handlers
    attachFormHandlers();

    if (currentPath.includes('forgot-password')) {
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) forgotForm.addEventListener('submit', handleForgotPassword);
    } else if (currentPath.includes('dashboard')) {
        loadUserData();
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
        const profileForm = document.getElementById('profileForm');
        if (profileForm) profileForm.addEventListener('submit', handleProfileUpdate);
    } else if (document.getElementById('authModal')) {
        MessageUtils.clearMessages();
    }

    // Handle OAuth
    handleOAuthRedirect();
});

// Resend verification email
async function handleResendVerification(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value || document.getElementById('regEmail').value;
    if (!email) {
        document.getElementById('authError').textContent = 'Please enter your email first.';
        document.getElementById('authError').classList.remove('d-none');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('authMessage').innerHTML = data.message + '<br><button id="resendVerification" class="btn btn-link p-0">Resend Email</button>';
            document.getElementById('resendVerification').addEventListener('click', handleResendVerification);
        } else {
            document.getElementById('authError').textContent = data.message;
            document.getElementById('authError').classList.remove('d-none');
        }
    } catch (error) {
        console.error('Resend verification fetch error:', error);
        document.getElementById('authError').textContent = 'Error resending email: ' + error.message;
        document.getElementById('authError').classList.remove('d-none');
    }
}