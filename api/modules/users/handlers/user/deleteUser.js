'use strick';

const User = require('../../model');

module.exports = async ({ id }) => {
   try {
      const user = await User.findByPk(id);

      if (!user) {
         const err = new Error(`Is't found user`);
         err.code = 404;
         throw err;
      }

      await User.destroy({ where: { id: id } });
   } catch (error) {
      throw error;
   }
};
