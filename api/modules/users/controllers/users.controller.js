'use strict';

const { getListUser, createUser, deleteUser, editUser, findUser } = require('../handlers/user');

module.exports = class UserController {
   static async getListUser(req, res, next) {
      try {
         const data = await getListUser();

         return res.render('index.hbs', {
            users: data,
         });
      } catch (error) {
         next(error);
      }
   }

   static async formCreateUser(req, res, next) {
      try {
         if (!req.body) return res.sendStatus(400);
         return res.status(200).render('create.hbs');
      } catch (error) {
         next(error);
      }
   }

   static async createUser(req, res, next) {
      try {
         await createUser(req.body);
         res.redirect('/api');
      } catch (error) {
         next(error);
      }
   }

   static async formEditUser(req, res, next) {
      try {
         const user = await findUser(req.params);

         return res.status(200).render('edit.hbs', {
            user: user[0],
         });
      } catch (error) {
         next(error);
      }
   }

   static async editUser(req, res, next) {
      try {
         if (!req.body) return res.sendStatus(400);

         await editUser(req.body);

         return res.status(200).redirect('/api');
      } catch (error) {
         next(error);
      }
   }

   static async deleteUser(req, res, next) {
      try {
         await deleteUser(req.params);

         return res.status(201).redirect('/api');
      } catch (error) {
         next(error);
      }
   }
};
