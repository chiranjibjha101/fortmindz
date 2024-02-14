const { Appointment, Service, Salon, Beautician } = require("../models/db");
const { appointment } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");

const createAppointment = async (req, res) => {
  try {
    const { serviceId, beauticianId, salonId, date, time_of_day } = req.body;
    const serviceExists = await Service.exists({ _id: serviceId });
    if (!serviceExists) {
      const message = appointment.error.service;
      return res.status(code.notFound).json({ status: false, message });
    }
    const beauticianExists = await Beautician.exists({ _id: beauticianId });
    if (!beauticianExists) {
      const message = appointment.error.beautician;
      return res.status(code.notFound).json({ status: false, message });
    }
    const salonExists = await Salon.exists({ _id: salonId });
    if (!salonExists) {
      const message = appointment.error.salon;
      return res.status(code.notFound).json({ status: false, message });
    }

    ///existing appointment
    const existingAppointment = await Appointment.findOne({
      service: serviceId,
      beautician: beauticianId,
      salon: salonId,
      user: req.user._id,
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
      user: req.user._id,
      date,
      time_of_day,
    });

    await newAppointment.save();

    const message = appointment.success.created;
    res.status(code.created).json({ status: true, message });
  } catch (err) {
    console.log(err);
    const message = appointment.error.create;
    res.status(code.internalServerError).json({ status: false, message });
  }
};
const getAppointmentsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const appointments = await Appointment.find({
      service: serviceId,
      user: req.user._id,
    }).populate(["salon", "beautician", "service"]);

    const message = appointment.success.fetchedByService;
    res.status(code.ok).json({ status: true, message, data: appointments });
  } catch (err) {
    console.log(err);
    const message = appointment.error.fetchByService;
    res.status(code.internalServerError).json({ status: false, message });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByService,
};
