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
        if (!window.location.search.includes('token=')) {
            return; // Early return for no token param
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token || typeof token !== 'string' || token.trim() === '') {
            console.error('Invalid or missing token in URL');
            alert('Invalid authentication token. Please log in again.');
            // Optionally clear params and redirect to login
            window.history.replaceState(null, null, window.location.pathname);
            window.location.href = 'login.html';
            return;
        }

        setToken(token);
        
        // Clean URL to remove sensitive token from history
        window.history.replaceState(null, null, window.location.pathname);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error handling OAuth redirect:', error);
        alert('Error processing authentication: ' + error.message);
        window.history.replaceState(null, null, window.location.pathname);
        window.location.href = 'login.html';
    }
}

// Check if user is authenticated
function isAuthenticated() {
    const token = getToken();
    return !!token;
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

// Show register form
function showRegisterForm() {
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    if (!email || !password) return alert('Form elements not found');
    const emailVal = email.value;
    const passwordVal = password.value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailVal, password: passwordVal })
        });

        const data = await response.json();

        if (response.ok) {
            setToken(data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Login error: ' + error.message);
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    if (!firstName || !lastName || !email || !password) return alert('Form elements not found');
    const firstNameVal = firstName.value;
    const lastNameVal = lastName.value;
    const emailVal = email.value;
    const passwordVal = password.value;

    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName: firstNameVal, lastName: lastNameVal, email: emailVal, password: passwordVal })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        alert('Registration error: ' + error.message);
    }
}

// Handle forgot password
async function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message || 'Failed to send reset link');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Handle profile update
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const token = getToken();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

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
            bootstrap.Modal.getInstance(document.getElementById('profileModal')).hide();
        } else {
            alert(data.message || 'Profile update failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Handle logout
function handleLogout() {
    clearToken();
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.textContent = 'Account';
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('accountModal'));
    if (modal) {
        modal.hide();
    }
    window.location.href = 'index.html';
}

// Load user data on dashboard
async function loadUserData() {
    const token = getToken();
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('userName').textContent = `${data.user.firstName} ${data.user.lastName}`;
            document.getElementById('userEmail').textContent = data.user.email;
        } else {
            clearToken();
            window.location.href = 'login.html';
        }
    } catch (error) {
        clearToken();
        window.location.href = 'login.html';
    }
}

// Initialize auth functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;

    // Handle account button on non-auth pages (e.g., index.html, services.html)
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn && !currentPath.includes('login') && !currentPath.includes('register') && !currentPath.includes('dashboard') && !currentPath.includes('forgot-password')) {
        // Update button text based on auth status
        if (isAuthenticated()) {
            accountBtn.textContent = 'Dashboard';
            accountBtn.addEventListener('click', function() {
                window.location.href = 'dashboard.html';
            });
        } else {
            accountBtn.textContent = 'Login';
            accountBtn.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    }

    if (currentPath.includes('login')) {
        showLoginForm();
    } else if (currentPath.includes('register')) {
        showRegisterForm();
    } else if (currentPath.includes('forgot-password')) {
        document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    } else if (currentPath.includes('dashboard')) {
        loadUserData();
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
    }

    // Handle OAuth token from URL (call the shared function)
    handleOAuthRedirect();
});