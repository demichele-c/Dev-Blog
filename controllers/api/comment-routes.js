const router = require("express").Router(); // Router object from Express.js for handling routes
const { Comment } = require("../../models"); // Comment model for database operations
const withAuth = require("../../utils/auth"); // Middleware function to check authentication

// Route to get all comments
router.get("/", (req, res) => {
  Comment.findAll() // Fetch all comments from the database
    .then((dbCommentData) => res.json(dbCommentData)) // Send all comment data as a JSON response
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to create a new comment
router.post("/", withAuth, (req, res) => {
  // Only allow authenticated users to post comments
  Comment.create({
    // Create a new comment with the following data
    comment_text: req.body.comment_text, // Text of the comment from the request body
    user_id: req.session.user_id, // ID of the user making the comment, stored in session
    post_id: req.body.post_id, // ID of the post being commented on, from the request body
  })
    .then((dbCommentData) => res.json(dbCommentData)) // Send the created comment data as a JSON response
    .catch((err) => {
      // If there's an error, log it and send a 400 status
      console.log(err);
      res.status(400).json(err); // 400 status indicates a client-side error, e.g., bad request
    });
});

// Route to delete an existing comment
router.delete("/:id", withAuth, (req, res) => {
  // Only allow authenticated users to delete comments
  Comment.destroy({
    where: {
      id: req.params.id, // Delete the comment with the specified ID
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        // If no comment is found with the given ID
        res.status(404).json({ message: "No comment found with this id!" }); // 404 status indicates not found
        return;
      }
      res.json(dbCommentData); // Send back the deleted comment data as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Export the router to be used in other parts of the application
module.exports = router;
