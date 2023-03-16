const db = require("../models");
const Ticket = db.tickets;

// create and save new ticket
exports.create = (req, res) => {
    
    // validation
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!: "});
        return;
    }

    // create ticket
    const ticket = new Ticket({
        title: req.body.title,
        description: req.body.dsecription,
        published: req.body.published ? req.body.published : false
    });

    // save ticket in db
    ticket.save(ticket).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating ticket"
        });
    });

};

// retrieve all tickets from db
exports.findAll = (req, res) => {

};

// retrieve one ticket from db with id
exports.findOne = (req, res) => {

};

// update a ticket in db by id
exports.update = (req, res) => {

};

// delete a ticket from db by id
exports.delete = (req, res) => {

};

// delete all tickets from db
exports.deleteAll = (req, res) => {

};

// find all published tickets
exports.findAllPublished = (req, res) => {

};