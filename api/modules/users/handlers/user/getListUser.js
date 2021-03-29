'use strick';

const User = require('../../model');

module.exports = async () => {
   try {
      const listCategory = await User.findAll({ raw: true });

      return listCategory;
   } catch (error) {
      throw error;
   }
};
