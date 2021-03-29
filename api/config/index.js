'use strict';

const path = require('path');

try {
   require('dotenv').config({ path: path.join(__dirname, '../../.env') });
} catch (error) {
   const err = new Error('Dotenv error');
   err.code = 500;
   throw err;
}

const { ROOT_DB, PASSWORD_DB, PORT_DB, PORT, HOST_DB, CORS_URL } = process.env;

module.exports = {
   corsUrl: CORS_URL,
   port: PORT || 3100,
   root_db: ROOT_DB || 'root',
   password_db: PASSWORD_DB || '123456789',
   port_db: PORT_DB || 1433,
   host_db: HOST_DB || 'localhost',
};
