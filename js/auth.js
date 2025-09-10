// Frontend authentication logic for D.Solution
const API_BASE = 'http://localhost:5000/api/auth';

// Load token from localStorage
function getToken() {
    return localStorage.getToken('authToken');
}

// Set token to localStorage
function setToken(token) {
    localStorage.setItem('authToken', token);
}

// Clear token from localStorage
function clearToken() {
    localStorage.removeItem('authToken');
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
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
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
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password })
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
    window.location.href = 'login.html';
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
});

// Google OAuth redirect handling
if (window.location.search.includes('token=')) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        setToken(token);
        window.location.href = 'dashboard.html';
    }
}