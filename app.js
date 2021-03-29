const Sequelize = require('sequelize');
const express = require('express');

const app = express();

// определяем объект Sequelize
const sequelize = new Sequelize('usersdb', 'root', '123456789', {
   dialect: 'mysql',
   host: 'localhost',
   port: '1433',
   define: {
      timestamps: false,
   },
});

// определяем модель User
const User = sequelize.define('user', {
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
});

app.set('view engine', 'hbs');

// синхронизация с бд, после успшной синхронизации запускаем сервер
sequelize
   .sync()
   .then(() => {
      app.listen(3000, function () {
         console.log('Сервер ожидает подключения...');
      });
   })
   .catch(err => console.log(err));

// получение данных
app.get('/', express.urlencoded(), express.json(), function (req, res) {
   User.findAll({ raw: true })
      .then(data => {
         res.render('index.hbs', {
            users: data,
         });
      })
      .catch(err => console.log(err));
});

app.get('/create', function (req, res) {
   res.render('create.hbs');
});

// добавление данных
app.post('/create', express.urlencoded(), express.json(), function (req, res) {
   if (!req.body) return res.sendStatus(400);

   const username = req.body.name;
   const userage = req.body.age;
   User.create({ name: username, age: userage })
      .then(() => {
         res.redirect('/');
      })
      .catch(err => console.log(err));
});

// получаем объект по id для редактирования
app.get('/edit/:id', express.urlencoded(), express.json(), function (req, res) {
   const userid = req.params.id;
   User.findAll({ where: { id: userid }, raw: true })
      .then(data => {
         res.render('edit.hbs', {
            user: data[0],
         });
      })
      .catch(err => console.log(err));
});

// обновление данных в БД
app.post('/edit', express.urlencoded(), express.json(), function (req, res) {
   if (!req.body) return res.sendStatus(400);

   const username = req.body.name;
   const userage = req.body.age;
   const userid = req.body.id;
   User.update({ name: username, age: userage }, { where: { id: userid } })
      .then(() => {
         res.redirect('/');
      })
      .catch(err => console.log(err));
});

// удаление данных
app.post('/delete/:id', express.urlencoded(), express.json(), function (req, res) {
   const userid = req.params.id;
   User.destroy({ where: { id: userid } })
      .then(() => {
         res.redirect('/');
      })
      .catch(err => console.log(err));
});