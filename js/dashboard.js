// Dashboard script for D.Solution
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    fetch('/api/auth/dashboard', {
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = '/login.html';
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            document.getElementById('userName').textContent = `${data.user.firstName} ${data.user.lastName}`;
            document.getElementById('userEmail').textContent = data.user.email;
            const verificationStatus = data.user.isVerified ? 'Verified' : 'Pending';
            const statusElement = document.createElement('p');
            statusElement.innerHTML = `<strong>Verification Status:</strong> ${verificationStatus}`;
            document.getElementById('userEmail').parentNode.appendChild(statusElement);
        }
    })
    .catch(error => {
        console.error('Error loading user data:', error);
        window.location.href = '/login.html';
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(() => {
            window.location.href = '/login.html';
        })
        .catch(error => {
            console.error('Logout error:', error);
            window.location.href = '/login.html';
        });
    });
});