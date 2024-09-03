document.addEventListener('DOMContentLoaded', () => {
  // Function to handle comment form submission
  async function commentFormHandler(event) {
    event.preventDefault();

    // Get comment text from the form
    const comment_text = document
      .querySelector('textarea[name="comment-body"]')
      .value.trim();

    // Get the post ID from the URL
    const post_id = window.location.toString().split("/").pop();

    // Check if the comment text is not empty
    if (comment_text) {
      try {
        // Use the comments POST API to submit the new comment
        const response = await fetch("/api/comments", {
          method: "POST",
          body: JSON.stringify({
            post_id,
            comment_text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Reload the page to show the new comment
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  }

  // Function to handle comment deletion
  async function deleteComment(event) {
    if (!event.target.classList.contains('delete-comment')) {
      return; // Exit if the clicked element is not a delete button
    }

    const commentId = event.target.getAttribute('data-id'); // Get the comment ID from the data attribute

    try {
      // Send a DELETE request to the server to delete the comment
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the comment element from the DOM
        event.target.closest('section.card').remove();
      } else {
        alert('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  }

  // Attach event listeners
  const commentForm = document.querySelector('.comment-form');
  const commentsSection = document.querySelector('.comments');

  if (commentForm) {
    commentForm.addEventListener('submit', commentFormHandler);
  }

  if (commentsSection) {
    commentsSection.addEventListener('click', deleteComment);
  }
});
