const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const uploadCtrl = require('../controllers/upload.ctrl');
const typeCtrl = require('../controllers/type.ctrl');
const roomCtrl = require('../controllers/room.ctrl');
const orderCtrl = require('../controllers/order.ctrl');
const detilCtrl = require('../controllers/detil.ctrl');
const authCtrl = require('../controllers/auth.ctrl');
const filterRoom = require('../controllers/filter_room.ctrl');

let routes = (app) => {
	router.get('/public/upload/:name', uploadCtrl.readImage);

	//filter room
	router.get('/filter', filterRoom.findRoom);

	//type
	router.post('/type', typeCtrl.store);
	router.get('/type', auth, typeCtrl.findAll);
	router.get('/type/:id', typeCtrl.findOne);
	router.put('/type/:id', typeCtrl.update);
	router.delete('/type/:id', typeCtrl.deleteOne);

	//room
	router.get('/room', roomCtrl.findAll);
	router.post('/room', roomCtrl.store);
	router.get('/room/:id', roomCtrl.findOne);
	router.put('/room/:id', roomCtrl.update);
	router.delete('/room/:id', roomCtrl.deleteOne);

	//order
	router.get('/order', orderCtrl.findAll);
	router.post('/order', orderCtrl.store);
	router.delete('/order/:id', orderCtrl.deleteOne);

	//detil
	router.get('/detil', detilCtrl.findAll);
	router.post('/detil', detilCtrl.store);




	//auth
	router.post('/auth/register', authCtrl.register);
	router.post('/auth/login', authCtrl.login);



	app.use(router);
};

module.exports = routes;
