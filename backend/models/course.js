const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'courses',
});

module.exports = Course;
