// GRAB reference to the FORM and its INPUTS
const registerForm = document.getElementById('register-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Add an event listener to the FORM ("submit")
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture the user data
    let userData = {
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
    };

    // Fetch the POST data from the server
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('Registration successful!');
            window.location.replace('/login'); // Redirect to the login page
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
    }
});
