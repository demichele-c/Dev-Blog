// Import necessary modules and dependencies
const router = require("express").Router(); // Router object from Express.js for handling routes
const { User, Post, Comment } = require("../../models"); // Importing models: User, Post, and Comment

// Route to get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] }, // Exclude password from the returned data for security reasons
  })
    .then((dbUserData) => res.json(dbUserData)) // Send all user data as a JSON response
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to get a single user by their ID
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] }, // Exclude password from the returned data for security reasons
    where: {
      id: req.params.id, // Find the user with the specific ID from the request parameter
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_text", "created_at"], // Include posts created by the user
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"], // Include comments made by the user
        include: {
          model: Post,
          attributes: ["title"], // Include title of the post that the comment belongs to
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // If no user is found with the given ID
        res.status(404).json({ message: "No user with this id" }); // 404 status indicates not found
        return;
      }
      res.json(dbUserData); // Send the found user data as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to create a new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username, // Username from the request body
    email: req.body.email, // Email from the request body
    password: req.body.password, // Password from the request body
  })
    .then((dbUserData) => {
      // Save session details when the user is logged in
      req.session.save(() => {
        req.session.user_id = dbUserData.id; // Save user ID to session
        req.session.username = dbUserData.username; // Save username to session
        req.session.loggedIn = true; // Set logged in status to true

        res.json(dbUserData); // Send the created user data as a JSON response
      });
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to log in a user with their username
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username, // Find the user with the specific username from the request body
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      // If no user is found with the given username
      res.status(400).json({ message: "No user with that username!" }); // 400 status indicates a bad request
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password); // Check if the password is correct

    if (!validPassword) {
      // If the password is incorrect
      res.status(400).json({ message: "Incorrect password!" }); // 400 status indicates a bad request
      return;
    }

    // If the password is correct, save session details and log the user in
    req.session.save(() => {
      req.session.user_id = dbUserData.id; // Save user ID to session
      req.session.username = dbUserData.username; // Save username to session
      req.session.loggedIn = true; // Set logged in status to true

      res.json({ user: dbUserData, message: "You are now logged in!" }); // Send success message and user data
    });
  });
});

// Route to log out a user by ending their session
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // Check if the user is logged in
    req.session.destroy(() => {
      // Destroy the session to log the user out
      res.status(204).end(); // 204 status indicates no content, successfully logged out
    });
  } else {
    res.status(404).end(); // If no session is found, send a 404 status
  }
});

// Route to update a user's information by their ID
// Note: This route is not used anywhere in the app currently
router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true, // Use hooks for validation or transformations
    where: {
      id: req.params.id, // Find the user with the specific ID from the request parameter
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        // If no user is found with the given ID
        res.status(404).json({ message: "No user found with this id" }); // 404 status indicates not found
        return;
      }
      res.json(dbUserData); // Send the updated user data as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Route to delete a user by their ID
// Note: This route is not used anywhere in the app currently
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id, // Find the user with the specific ID from the request parameter
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // If no user is found with the given ID
        res.status(404).json({ message: "No user found with this id" }); // 404 status indicates not found
        return;
      }
      res.json(dbUserData); // Send the deleted user data as a JSON response
    })
    .catch((err) => {
      // If there's an error, log it and send a 500 status
      console.log(err);
      res.status(500).json(err); // 500 status indicates a server error
    });
});

// Export the router to be used in other parts of the application
module.exports = router; // Makes the router available for import in other files
