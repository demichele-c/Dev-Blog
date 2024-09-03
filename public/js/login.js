// Function to handle login form submission
async function loginFormHandler(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get values from the form inputs
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  try {
    // Send POST request to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check response status
    if (response.ok) {
      // Redirect or handle successful login
      document.location.replace('/dashboard');
    } else {
      // Handle errors (e.g., incorrect username/password)
      const result = await response.json();
      alert(result.message || 'An error occurred');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
}

// Attach event listener to the form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
