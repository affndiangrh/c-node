const express = require('express');
const router = express.Router();
const { getZoneController, idCheckController } = require('../controllers');

const routes = [
   {
      method: 'GET',
      path: '/game/:game',
      controller: idCheckController,
   },
   {
      method: 'GET',
      path: '/game/get-zone/:game',
      controller: getZoneController,
   },
];

// Menetapkan rute menggunakan objek
routes.forEach((route) => {
   const { method, path, controller } = route;
   console.log(`Menambahkan route ${method} ${path}`);
   router[method.toLowerCase()](path, controller);
});

module.exports = router;
