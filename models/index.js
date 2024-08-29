const User = require('./User');  // Ensure file names match
const Post = require('./Post');
const Comment = require('./Comment');

// User has many Posts
User.hasMany(Post, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'Post_id',
  onDelete: 'CASCADE',
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});

// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'Post_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Post,
  Comment,
};
