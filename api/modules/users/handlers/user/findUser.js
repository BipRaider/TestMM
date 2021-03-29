'use strick';

const User = require('../../model');

module.exports = async ({ id }) => {
   try {
      const user = await User.findAll({ where: { id: id }, raw: true });

      if (!user) {
         const err = new Error(`Is't found user`);
         err.code = 404;
         throw err;
      }

      return user;
   } catch (error) {
      throw error;
   }
};
