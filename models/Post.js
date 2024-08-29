// Import the Model and DataTypes classes from Sequelize
const { Model, DataTypes } = require("sequelize");
// Import the Sequelize connection instance from the config file
const sequelize = require("../config/connection");

// Initialize the Post model by extending the Sequelize Model class
class Post extends Model {}

// Set up fields and rules for the Post model
Post.init(
  {
    // Define the 'id' field as an integer, which is not nullable, is the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'title' field as a string, which is not nullable
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'post_text' field as text, which is not nullable, and must have a length of at least 1 character
    post_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1], // Ensures that the text has at least 1 character
      },
    },
    // Define the 'user_id' field as an integer that references the 'id' field in the 'user' model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // References the 'user' table
        key: "id",     // Uses the 'id' field in the 'user' table
      },
    },
  },
  {
    // Additional model settings
    sequelize,                // Passes the Sequelize instance
    freezeTableName: true,    // Prevents Sequelize from pluralizing the table name
    underscored: true,        // Converts camelCase to snake_case in the database
    modelName: "post",        // Sets the name of the model
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
