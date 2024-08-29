document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-post');
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const postId = event.target.getAttribute('data-id');
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to delete post');
          }
        } catch (err) {
          console.error('Error deleting post:', err);
        }
      });
    });
  });
  