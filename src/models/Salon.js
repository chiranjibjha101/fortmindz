module.exports = function (mongoose) {
  const salonSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    beautician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beautician",
    },
    address: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    beautician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beautician",
    },
    ratings: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
  });

  const Salon = mongoose.model("Salon", salonSchema);
  return Salon;
};
