const { Model, DataTypes } = require("sequelize"); // Import Model and DataTypes from Sequelize
const bcrypt = require("bcrypt"); // Import bcrypt for hashing passwords
const sequelize = require("../config/connection"); // Import the Sequelize instance for database connection

// Create the User model by extending Sequelize's Model class
class User extends Model {
  // Method to compare the provided password with the hashed password in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with fields and validation rules
User.init(
  {
    // Define the 'id' field as an integer, not nullable, primary key, and auto-incrementing
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'username' field as a string, which cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'email' field as a string, which cannot be null, must be unique, and must be a valid email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures the email address is valid
      },
    },
    // Define the 'password' field as a string, which cannot be null and must be at least 4 characters long
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], // Enforces a minimum length of 4 characters for the password
      },
    },
  },
  {
    // Hooks for hashing passwords before creating or updating a user
    hooks: {
      // Hook that runs before a new user is created, hashes the password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hook that runs before a user is updated, hashes the new password if it has changed
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,                // Pass the Sequelize instance for database connection
    timestamps: false,        // Disable automatic creation of timestamps fields (createdAt, updatedAt)
    freezeTableName: true,    // Ensure the table name is 'user', not pluralized
    underscored: true,        // Use snake_case for column names instead of camelCase
    modelName: "user",        // Set the model name to 'user'
  }
);

// Export the User model so it can be used in other parts of the application
module.exports = User;
