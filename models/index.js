// Import the User model from the User.js file
const User = require("./User");
// Import the Post model from the Post.js file
const Post = require("./Post");
// Import the Comment model from the Comment.js file
const Comment = require("./Comment");

// Define relationships between models

// A user can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",  // The foreign key in the Post model that references the User model
});

// A user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",  // The foreign key in the Comment model that references the User model
  onDelete: "cascade",    // When a user is deleted, all related comments will be deleted as well
  hooks: true,            // Enables hooks to handle cascading deletes automatically
});

// A post belongs to a single user
Post.belongsTo(User, {
  foreignKey: "user_id",  // The foreign key in the Post model that references the User model
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",  // The foreign key in the Comment model that references the Post model
  onDelete: "cascade",    // When a post is deleted, all related comments will be deleted as well
  hooks: true,            // Enables hooks to handle cascading deletes automatically
});

// A comment belongs to a single user
Comment.belongsTo(User, {
  foreignKey: "user_id",  // The foreign key in the Comment model that references the User model
  onDelete: "cascade",    // When a user is deleted, all related comments will be deleted as well
  hooks: true,            // Enables hooks to handle cascading deletes automatically
});

// A comment belongs to a single post
Comment.belongsTo(Post, {
  foreignKey: "post_id",  // The foreign key in the Comment model that references the Post model
  onDelete: "cascade",    // When a post is deleted, all related comments will be deleted as well
  hooks: true,            // Enables hooks to handle cascading deletes automatically
});

// Export the models and their relationships
module.exports = { User, Post, Comment };
