'use strict';

const User = require('../../model');

module.exports = async data => {
   try {
      const username = data.name;
      const userage = data.age;

      if (data.name === undefined && data.age === undefined) {
         const err = new Error('You could not register your user');
         err.code = 409;
         throw err;
      }

      const newUser = await User.create({
         name: username,
         age: userage,
      });

      return newUser;
   } catch (error) {
      throw error;
   }
};
