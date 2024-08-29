//-----Import Dependencies----
// Import the Router object from Express.js for handling routes
const router = require("express").Router();
// Import Sequelize connection configuration
const sequelize = require("../config/connection");
// Import models: Post, User, and Comment
const { Post, User, Comment } = require("../models");

// Route to get all posts for the homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"], // Specify attributes to include in the response
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], // Include comments related to each post
        include: {
          model: User,
          attributes: ["username"], // Include the username of the commenter
        },
      },
      {
        model: User,
        attributes: ["username"], // Include the username of the post author
      },
    ],
  })
    .then((dbPostData) => {
      // Serialize the data before passing it to the template
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // Render the 'homepage' Handlebars template with posts data and loggedIn status
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to get a single post for displaying on the homepage
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id, // Fetch the post with the specific ID from the request parameters
    },
    attributes: ["id", "post_text", "title", "created_at"], // Specify attributes to include in the response
    include: [
      {
        // Include comments related to the post
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"], // Include the username of the commenter
        },
      },
      {
        model: User,
        attributes: ["username"], // Include the username of the post author
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        // If no post is found, send a 404 status with a message
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // Serialize the data before passing it to the template
      const post = dbPostData.get({ plain: true });
      // Render the 'single-post' Handlebars template with post data and loggedIn status
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to render the login page or redirect to the dashboard if already logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard"); // Redirect to dashboard if user is already logged in
    return;
  }
  // Render the 'login' Handlebars template
  res.render("login");
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  // Render the 'signup' Handlebars template
  res.render("signup");
});

// Export the router to be used in other parts of the application
module.exports = router; // Makes the router available for import in other files
