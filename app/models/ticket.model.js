module.exports = mongoose => {
    const Ticket = mongoose.model(
      "ticket",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Ticket;
  };