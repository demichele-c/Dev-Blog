const User = require('./User');  // Ensure file names match
const Post = require('./Post');
const Comment = require('./Comment');

// User has many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Post,
  Comment,
};
