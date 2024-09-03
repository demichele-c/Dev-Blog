// Function to handle the new post button click event
async function newPost(event) {
  // Prevent the default form submission behavior, if this is a form element
  event.preventDefault();
  
  // Redirect the user to the new post page
  document.location.replace("/dashboard/new-post");
}

// Add an event listener to the element with the ID "new-post"
// This listens for "click" events and calls the newPost function when the element is clicked
document.querySelector("#new-post").addEventListener("click", newPost);