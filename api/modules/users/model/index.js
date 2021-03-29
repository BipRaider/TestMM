'use strick';

const { Sequelize, Model } = require('sequelize');
const { connectionUsersDB } = require('../../../data');

class User extends Model {}

module.exports = User.init(
   {
      id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
      },
      name: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      age: {
         type: Sequelize.INTEGER,
         allowNull: false,
      },
   },
   {
      sequelize: connectionUsersDB,
      modelName: 'user',
   },
);
