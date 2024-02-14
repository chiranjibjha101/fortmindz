module.exports = function (mongoose) {
  const beauticianSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "Salon",
      },
    ],
  });
  const Beautician = mongoose.model("Beautician", beauticianSchema);
  return Beautician;
};
