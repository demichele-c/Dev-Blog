// GRAB reference to the FORM and its INPUTS
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Add an event listener to the FORM ("submit")
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture the user data
    const userData = {
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
    };

    console.log('Login data:', userData); // Log user data for debugging

    // Fetch the POST data from the server
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const user = await response.json();
            alert('Login successful!');
            window.location.replace('/dashboard'); // Redirect to the dashboard or another page
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
});
