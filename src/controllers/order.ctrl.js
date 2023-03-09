const db = require('../models');
const User = db.user;
const Type = db.type;
const Room = db.room;
const Detil = db.detil;

const Order = db.order;

const sequelize = require(`sequelize`);
const Op = sequelize.Op;

const findAll = (req, res) => {
	Order
        .find()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving types.'
			});
		});
};

const store = (req, res) => {
    if (!req.body.num_order || !req.body.order_name || !req.body.order_email || !req.body.order_date || !req.body.check_in || !req.body.check_out || !req.body.guest_name || !req.body.room_ordered || !req.body.id_type || !req.body.status || !req.body.id_user) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const order = new Order({
        num_order: req.body.num_order,
        order_name: req.body.order_name,
        order_email: req.body.order_email,
        order_date: Date.now(),
        check_in: new Date(req.body.check_in),
        check_out: new Date(req.body.check_out),
        guest_name: req.body.guest_name,
        room_ordered: req.body.room_ordered,
        id_type: req.body.id_type,
        status: req.body.status,
        id_user: req.body.id_user
    });
    order
        .save(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        });
};

const deleteOne = (req, res) => {
    const id = req.params.id;
    Order.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
                });
            } else {
                res.send({
                    message: "Room was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with id=" + id
            });
        });
};




module.exports = {
	findAll,
	store,
    deleteOne
};


