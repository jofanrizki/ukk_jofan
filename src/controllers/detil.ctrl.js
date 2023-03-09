const db = require("../models");
const Detil = db.detil;

const findAll = (req, res) => {
    Detil.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving types."
        });
    });
}
const store = (req, res) => {
    if (!req.body.acces_date || !req.body.price || !req.body.id_order || !req.body.id_room) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const detil = new Detil({
        acces_date: new Date(req.body.acces_date),
        price: req.body.price,
        id_order: req.body.id_order,
        id_room: req.body.id_room
    });
    detil
        .save(detil)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        });
};

module.exports = {
    findAll,
    store,
}