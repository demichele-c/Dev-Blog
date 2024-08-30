// Middleware function to protect routes from unauthorized access
const withAuth = (req, res, next) => {
    // Check if user is authenticated by verifying the existence of a user_id in the session
    if (!req.session.user_id) {
      // If user is not authenticated, redirect to the login page
      res.redirect("/login");
    } else {
      // If user is authenticated, allow the request to proceed to the next middleware or route handler
      next();
    }
  };
  
  // Export the middleware function for use in other parts of the application
  module.exports = withAuth;
  