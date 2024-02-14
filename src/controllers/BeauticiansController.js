const { Beautician } = require("../models/db");
const { beauticians } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");

const getAllBeauticians = async (req, res) => {
  try {
    const BeauticiansList = await Beautician.find();
    res.status(code.ok).json({
      status: true,
      message: beauticians.success.fetchedBeautician,
      data: BeauticiansList,
    });
  } catch (err) {
    res
      .status(code.internalServerError)
      .json({ status: true, message: beauticians.error.fetchedBeautician });
  }
};

module.exports = {
  getAllBeauticians,
};
