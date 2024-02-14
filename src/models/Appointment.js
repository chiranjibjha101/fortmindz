module.exports = function (mongoose) {
  const appointmentSchema = mongoose.Schema({
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    beautician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beautician",
      required: true,
    },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time_of_day: {
      type: String,
      enum: ["morning", "afternoon"],
      required: true,
    },
  });
  const Appointment = mongoose.model("Appointment", appointmentSchema);
  return Appointment;
};
