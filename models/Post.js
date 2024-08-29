const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define the Post model
class Post extends Model {}

// Initialize the Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',  // Ensure this matches the table name for User
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,       // Automatically add `createdAt` and `updatedAt` fields
    freezeTableName: true,  // Use the model name as the table name
    underscored: true,      // Use snake_case for column names
    modelName: 'Post',      // Model name (should be lowercase and match the model file name)
  }
);

module.exports = Post;
