// Import the Model and DataTypes objects from Sequelize, which are used to define and interact with the Comment model
const { Model, DataTypes } = require("sequelize");
// Import the configured Sequelize instance, which connects the app to the database
const sequelize = require("../config/connection");

// Initialize the Comment model by extending Sequelize's Model class
class Comment extends Model {}

// Set up fields and rules for the Comment model
Comment.init(
  {
    // Define an 'id' column for unique identification of each comment
    id: {
      type: DataTypes.INTEGER, // Integer type
      allowNull: false,         // This field cannot be null
      primaryKey: true,         // Marks this field as the primary key
      autoIncrement: true,      // Automatically increments the value for each new record
    },
    // Define 'comment_text' column to store the text of the comment
    comment_text: {
      type: DataTypes.STRING,   // String type to hold text data
      allowNull: false,         // This field cannot be null, ensuring every comment has text
      validate: {
        len: [1],               // Validation rule: comment must be at least 1 character long
      },
    },
    // Define 'user_id' column to associate the comment with a specific user
    user_id: {
      type: DataTypes.INTEGER,  // Integer type
      references: {             // Foreign key relationship
        model: "user",          // References the 'user' model
        key: "id",              // References the 'id' field in the 'user' model
      },
    },
    // Define 'post_id' column to associate the comment with a specific post
    post_id: {
      type: DataTypes.INTEGER,  // Integer type
      references: {             // Foreign key relationship
        model: "post",          // References the 'post' model
        key: "id",              // References the 'id' field in the 'post' model
      },
    },
  },
  {
    sequelize,                  // Pass the Sequelize instance (database connection)
    freezeTableName: true,      // Prevent Sequelize from pluralizing table names
    underscored: true,          // Use underscores instead of camelCasing for column names
    modelName: "comment",       // Name of the model (used internally by Sequelize)
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
