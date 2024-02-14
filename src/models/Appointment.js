module.exports = function (mongoose) {
  const appointmentSchema = new Schema({
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    beautician: {
      type: Schema.Types.ObjectId,
      ref: "Beautician",
      required: true,
    },
    salon: {
      type: Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
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
