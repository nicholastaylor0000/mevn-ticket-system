module.exports = app => {

    const tickets = require("../controllers/ticket.controller.js")

    var router = require("express").Router();

    // Create new ticket
    router.post("/", tickets.create);

    // Retrieves all tickets
    router.get("/", tickets.findAll);

    // Retrieves all published tickets
    router.get("/published", tickets.findAllPublished);

    // Retrieve ticket by id
    router.get("/:id", tickets.findOne);

    // Update ticket by id
    router.put("/:id", tickets.update);
    
    // Delete ticket by id
    router.delete("/:id", tickets.delete);

    // Delete all ticketes
    router.delete("/", tickets.deleteAll);

    app.use('/api/tickets', router);

};