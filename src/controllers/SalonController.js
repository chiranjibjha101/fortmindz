const { Salon } = require("../models/db");
const { salons } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");
const SalonsByRatings = async (req, res) => {
  try {
    const { rating, beauticianId } = req.query;

    salonsQueary = { beautician: beauticianId, ratings: rating };
    const salonsData = await Salon.find(salonsQueary);
    res.status(code.ok).json({
      status: true,
      message: salons.success.sortByRatings,
      data: salonsData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(code.internalServerError)
      .json({ status: false, message: salons.error.sortByRatings });
  }
};

module.exports = {
  SalonsByRatings,
};
