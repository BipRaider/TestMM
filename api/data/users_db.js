'use strick';

const Sequelize = require('sequelize');
const config = require('../config');

const { root_db, password_db, host_db, port_db } = config;

const db = () => {
   try {
      const sequelize = new Sequelize('usersdb', root_db, password_db, {
         dialect: 'mysql',
         host: host_db,
         port: port_db,
         define: {
            timestamps: false,
         },
      });

      if (sequelize) {
         console.log('\x1b[33m%s\x1b[0m', '>>> Database connection successful');
      }
      return sequelize;
   } catch (error) {
      const err = new Error('Not connect db');
      err.code = 500;
      return err;
   }
};

module.exports = db();
