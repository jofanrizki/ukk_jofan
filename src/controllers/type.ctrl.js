const uploadFile = require('../middleware/upload');
const baseUrl = "http://localhost:8082/public/uploads/"

const db = require('../models');
const Type = db.type;

const store = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        else if(!req.body.title || !req.body.description || !req.body.price || !req.body.status ){
            return res.status(400).send({ message: "All field is required!" });
          }
        const type = new Type({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status ? req.body.status : false,
            filename: req.file.originalname,
        });
        type.save(type)
        .then(data => {
            res.status(200).send({
                message: "Type was created successfully!" + req.file.originalname,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Type."
            });
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};


const findAll = (req, res) => {
    Type.find()
    .then(data => {
        data.map((item) => {
            item.filename = baseUrl + item.filename
        })
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
    Type.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Type with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Type with id=" + id });
        });
};

const update = async (req, res) => {
    const directoryPath = __basedir + "/public/uploads/";
    await uploadFile(req, res);
    if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
    }else if(!req.body.title || !req.body.description || !req.body.price || !req.body.status ){
        return res.status(400).send({ message: "All field is required!" });
        }
    const id = req.params.id;
    const filename = req.file.originalname;

    Type.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Type with id=${id}. Maybe Type was not found!`,
                });
            } else {
                return Object.assign(data, {...req.body, filename});
            }
        })
        .then(data => {
            if(data){
                return data.save();
            }
        })
        .then((updateData) => {
            if(updateData){
                res.send(updateData);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Type with id=" + id,
            });
        });
};

const deleteOne = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const id = req.params.id;
    Type.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete portofolio with id=${id}. Maybe portofolio was not found!`
          });
        } else {
          res.send({ 
            message: "Portofolio was deleted successfully!"
        });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Portofolio with id= " + id
        });
      });
    };


module.exports = {
    store,
    findAll,
    findOne,
    update,
    deleteOne,
    
}
    