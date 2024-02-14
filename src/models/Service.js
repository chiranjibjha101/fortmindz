module.exports = function (mongoose) {
  const serviceSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
    },
  });

  const Service = mongoose.model("Service", serviceSchema);
  return Service;
};
