const db = require("../models");
const Room = db.room;

const store = (req, res) => {
    if (!req.body.id_type || !req.body.number_room) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const room = new Room({
        id_type: req.body.id_type,
        number_room: req.body.number_room,
        status: req.body.status
    });
    room
        .save(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Room."
            });
        });
};


const findAll = (req, res) => {
    Room.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving types."
        });
    });
};

const findOne = (req, res) => {
    const id = req.params.id;
    Room.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Room with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Room with id=" + id });
        });
};

const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Room with id=${id}. Maybe Room was not found!`
                });
            } else res.send({ message: "Room was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id=" + id
            });
        });
};

const deleteOne = (req, res) => {
    const id = req.params.id;
    Room.findByIdAndRemove(id)
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
    store,
    findAll,
    findOne,
    update,
    deleteOne


};