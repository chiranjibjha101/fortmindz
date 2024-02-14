const { Salon } = require("../models/db");
const { salons } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");
const sortSalonsByRatings = async (req, res) => {
  try {
    const { sortBy, order, beauticianId } = req.query;

    salonsQueary = { beautician: beauticianId };
    const sortQuery = {};
    sortQuery[sortBy] = order === "asc" ? 1 : -1;
    const salonsData = await Salon.find(salonsQueary).sort(sortQuery);
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
  sortSalonsByRatings,
};
