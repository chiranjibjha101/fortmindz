const { Appointment } = require("../models/db");
const { appointment } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");

const createAppointment = async (req, res) => {
  try {
    const { serviceId, beauticianId, salonId, date, time_of_day } = req.body;
    const existingAppointment = await Appointment.findOne({
      service: serviceId,
      beautician: beauticianId,
      salon: salonId,
      date,
      time_of_day,
    });

    if (existingAppointment) {
      const message = appointment.error.slotAlreadyBooked;
      return res.status(code.badRequest).json({ status: false, message });
    }

    const newAppointment = new Appointment({
      service: serviceId,
      beautician: beauticianId,
      salon: salonId,
      date,
      time_of_day,
    });

    await newAppointment.save();

    const message = appointment.success.created;
    res.status(code.created).json({ status: true, message });
  } catch (err) {
    const message = appointment.error.create;
    res.status(code.internalServerError).json({ status: false, message });
  }
};
const getAppointmentsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const appointments = await Appointment.find({ service: serviceId });

    const message = appointment.success.fetchedByService;
    res
      .status(httpCodes.code.ok)
      .json({ status: true, message, data: appointments });
  } catch (err) {
    const message = appointment.error.fetchByService;
    res.status(code.internalServerError).json({ status: false, message });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByService,
};
