const mongoose = require('mongoose');

const db = require('../models');
const Order = db.order;
const Room = db.room;

const findRoom = (req, res) => {
	Order.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId('6405faa9dc7e0cf9850e6cfa')
			}
		},
		{
			$lookup: {
			  from: "orders",
			  localField: "_id",
			  foreignField: "id_order",
			  as: "orders"
			}
		},
	]).then((data) => {
		res.send(data);
	});
};
module.exports = {
	findRoom
};
