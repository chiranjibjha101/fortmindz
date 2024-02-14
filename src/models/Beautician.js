module.exports = function (mongoose) {
  const beauticianSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    salons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
      },
    ],
  });
  const Beautician = mongoose.model("Beautician", beauticianSchema);
  return Beautician;
};
