document.getElementById('resetPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        showError('Passwords do not match. Please try again.');
        return;
    }

    try {
        // Here, you would send a request to your server to update the user's password
        // Below is a placeholder code for demonstration purpose only

        // Assuming you have a backend route for updating the password
        const response = await fetch('/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess(data.message);
            // Redirect the user after successful password reset
            setTimeout(function() {
                window.location.href = 'signin.html';
            }, 2000); // Redirect after 2 seconds
        } else {
            showError(data.message || 'An error occurred while resetting password. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred while resetting password. Please try again later.');
    }
});

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK'
    });
}

function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Password Reset!',
        text: message,
        confirmButtonText: 'OK'
    });
}
