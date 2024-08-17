const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// Define the User model

class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
  
//const User = sequelize.define(
//  'User',

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],  // Password must be at least 8 characters long
      },
    },
  },
  {
    hooks: {
      // Hash password before storing it in the database
      beforeCreate: async (newUserData) => {
        try {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        } catch (err) {
          console.error("Error hashing password before creating user: ", err);
          throw new Error('Failed to hash password');
        }
      },
      beforeUpdate: async (updatedUserData) => {
        try {
          if (updatedUserData.password) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          }
          return updatedUserData;
        } catch (err) {
          console.error("Error hashing password before updating user: ", err);
          throw new Error('Failed to hash password');
        }
      },
    },
    sequelize,
    timestamps: false,  // Disable automatic creation of `createdAt` and `updatedAt` fields
    freezeTableName: true,  // Use the model name as the table name
    underscored: true,  // Use snake_case for column names
    modelName: 'User',  // Model name (should be lowercase and match the model file name)
  }
);

module.exports = User;
