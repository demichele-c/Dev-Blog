//-----Import Dependencies----
// Import the Router object from Express.js for handling routes
const router = require("express").Router();
// Import Sequelize connection configuration
const sequelize = require("../config/connection");
// Import models: Post, User, and Comment
const { Post, User, Comment } = require("../models");
// Import custom authentication middleware
const withAuth = require("../utils/auth");

// Route to get all posts for the logged-in user and display them on the dashboard
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id, // Fetch posts only for the logged-in user
    },
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
      // Render the 'dashboard' Handlebars template with posts data and loggedIn status
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to render the 'new-post' page for creating a new post
router.get("/new-post", withAuth, (req, res) => {
  res.render("new-post", { loggedIn: true }); // Render 'new-post' template with loggedIn status
});

// Route to render the 'edit-post' page to edit a specific post by its ID
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "post_text", "title", "created_at"], // Specify attributes to include in the response
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], // Include comments related to the post
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
      if (dbPostData) {
        // Serialize the data before passing it to the template
        const post = dbPostData.get({ plain: true });
        // Render the 'edit-post' Handlebars template with post data and loggedIn status
        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end(); // If no post is found, send a 404 status
      }
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Export the router to be used in other parts of the application
module.exports = router; // Makes the router available for import in other files
