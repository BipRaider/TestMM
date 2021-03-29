'use strict';

const Joi = require('joi');

const { checkedId } = require('../../helpers');

module.exports = class ValidatorCategory {
   static validateCategory(req, res, next) {
      const validationCategory = Joi.object({
         category: Joi.string().required(),
      });

      const val = validationCategory.validate(req.body);

      if (val.error) {
         const err = new Error('Invalid request body');
         err.code = 400;
         throw err;
      }
      next();
   }

   static validateID(req, res, next) {
      const validationCategory = Joi.object({
         id: Joi.string().required(),
      });

      const val = validationCategory.validate(req.body);

      if (val.error) {
         const err = new Error('Invalid request body');
         err.code = 400;
         throw err;
      }

      checkedId(val.value.id);
      next();
   }
};
