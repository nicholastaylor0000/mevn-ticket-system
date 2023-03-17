const db = require('../models');
const Ticket = db.tickets;

// create and save new ticket
exports.create = (req, res) => {
	// validation
	if (!req.body.title) {
		res.status(400).send({ message: 'Content can not be empty! ' });
		return;
	}

	// create ticket
	const ticket = new Ticket({
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	});

	// save ticket in db
	ticket
		.save(ticket)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating ticket'
			});
		});
};

// retrieve all tickets from db
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

	Ticket.find(condition)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tickets'
			});
		});
};

// retrieve one ticket from db with id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Ticket.findById(id)
		.then((data) => {
			if (!data) res.status(404).send({ message: 'No found ticket with id ' + id });
			else res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: 'Error attempting to retrieve Tutorial with id=' + id });
		});
};

// update a ticket in db by id
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!'
		});
	}

	const id = req.params.id;

	Ticket.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update ticket with id=${id}. Ticket possibly does not exist.`
				});
			} else res.send({ message: 'Ticket was updated successfully.' });
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating ticket id=' + id
			});
		});
};

// delete a ticket from db by id
exports.delete = (req, res) => {
	const id = req.params.id;

	Ticket.findByIdAndRemove(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete ticket id=${id}. Ticket possibly does not exist.`
				});
			} else {
				res.send({
					message: 'Ticket was deleted successfully!'
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete ticket id=' + id
			});
		});
};

// delete all tickets from db
exports.deleteAll = (req, res) => {
	Ticket.deleteMany({})
		.then((data) => {
			res.send({
				message: `${data.deletedCount} tickets were deleted successfully!`
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all tickets.'
			});
		});
};

// find all published tickets
exports.findAllPublished = (req, res) => {
	Ticket.find({ published: true })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving published tickets.'
			});
		});
};
