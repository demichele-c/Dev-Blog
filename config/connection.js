const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


let sequelize;

if(process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL)
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      
      host: 'localhost',
      dialect: 'postgres',
    }
  )
}

module.exports = sequelize;

/*
module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'dev_blog_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: false, // Disable the automatic creation of `createdAt` and `updatedAt` fields
      underscored: true, // Use snake_case column names
    },
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    },
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'dev_blog_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    },
  },
};
*/