const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Use DATABASE_URL if available, otherwise use separate DB parameters
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false, // Set to true if you want to see SQL logs
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || 'localhost', // Default to localhost if not set
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432, // Default to 5432 if not set
      }
    );

module.exports = sequelize;
