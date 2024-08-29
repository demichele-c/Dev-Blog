// Import necessary modules and dependencies
const router = require("express").Router(); // Router object from Express.js for handling routes
const sequelize = require("../../config/connection"); // Sequelize instance for database connection
const { Post, User, Comment } = require("../../models"); // Importing models: Post, User, and Comment

// Middleware for routes that require user authentication
const withAuth = require("../../utils/auth");

// Route to get all posts
router.get("/", (req, res) => {
  Post.findAll({
    // Select specific attributes to return for each post
    attributes: ["id", "post_text", "title", "created_at"],
    // Include related comments and user data
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], // Comment details to include
        include: {
          model: User,
          attributes: ["username"], // Include username of the comment author
        },
      },
      {
        model: User,
        attributes: ["username"], // Include username of the post author
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData)) // Send all posts as a JSON response
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to get a single post by its ID
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id, // Find the post with the specific ID from the request parameter
    },
    attributes: ["id", "post_text", "title", "created_at"], // Select specific attributes to return
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], // Comment details to include
        include: {
          model: User,
          attributes: ["username"], // Include username of the comment author
        },
      },
      {
        model: User,
        attributes: ["username"], // Include username of the post author
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        // If no post is found with the given ID
        res.status(404).json({ message: "No post found with this id" }); // 404 status indicates not found
        return;
      }
      res.json(dbPostData); // Send the found post as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to create a new post
router.post("/", withAuth, (req, res) => {
  // Only allow authenticated users to create posts
  Post.create({
    title: req.body.title, // Title of the post from the request body
    post_text: req.body.post_text, // Content of the post from the request body
    user_id: req.session.user_id, // ID of the user creating the post, stored in session
  })
    .then((dbPostData) => res.json(dbPostData)) // Send the created post data as a JSON response
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to update an existing post by its ID
router.put("/:id", withAuth, (req, res) => {
  // Only allow authenticated users to update posts
  Post.update(
    {
      title: req.body.title, // Updated title of the post
      post_text: req.body.post_text, // Updated content of the post
    },
    {
      where: {
        id: req.params.id, // Find the post with the specific ID from the request parameter
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData[0]) {
        // If no post is found with the given ID
        res.status(404).json({ message: "No post found with this id" }); // 404 status indicates not found
        return;
      }
      res.json(dbPostData); // Send the updated post data as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to delete an existing post by its ID
router.delete("/:id", withAuth, (req, res) => {
  // Only allow authenticated users to delete posts
  console.log("id", req.params.id); // Log the ID of the post to be deleted for debugging
  Post.destroy({
    where: {
      id: req.params.id, // Find the post with the specific ID from the request parameter
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        // If no post is found with the given ID
        res.status(404).json({ message: "No post found with this id" }); // 404 status indicates not found
        return;
      }
      res.json(dbPostData); // Send the deleted post data as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Export the router to be used in other parts of the application
module.exports = router; // Makes the router available for import in other files
