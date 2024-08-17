const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: { // Updated from `comment_text` to `content` to match your controller and migration
      type: DataTypes.TEXT, // Changed to TEXT to accommodate longer comments
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Ensure this matches the model name
        key: 'id',
      },
      onDelete: 'CASCADE', // Optionally, add cascading behavior
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts', // Ensure this matches the model name
        key: 'id',
      },
      onDelete: 'CASCADE', // Optionally, add cascading behavior
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Will add `createdAt` and `updatedAt` columns
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    underscored: true, // Uses snake_case for column names
    modelName: 'comment',
  }
);

module.exports = Comment;
