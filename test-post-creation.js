const { User, Post, sequelize } = require('./models'); // Adjust the path if necessary

(async () => {
  try {
    // Fetch a user to associate with the post
    const user = await User.findOne(); // Ensure this fetches a valid user
    console.log('Fetched user:', user);
    if (user) {
      // Create a new post with the fetched user's ID
      const newPost = await Post.create({
        title: 'Test Post',
        content: 'This is a test post.',
        user_id: user.id // Ensure this user exists
      });
      console.log('Post created:', newPost);
    } else {
      console.log('No users found to associate with the post');
    }
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    // Close the connection to the database
    await sequelize.close();
  }
})();

// Check if user with id 1 exists
const user = await User.findByPk(1);
console.log(user); // Should print the user details if it exists
