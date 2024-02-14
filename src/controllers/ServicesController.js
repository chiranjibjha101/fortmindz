const { Service, Salon } = require("../models/db");
const { service } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");
const { ObjectId } = require("mongodb");

const getServicesByBeautician = async (req, res) => {
  try {
    const salons = await Salon.find({ beautician: req.params.beauticianId });
    const salonIds = salons.map((salon) => new ObjectId(salon._id));
    const services = await Service.find({ salon: { $in: salonIds } }).populate(
      "salon"
    );
    res.status(code.ok).json({
      status: true,
      message: service.success.fetchedByBeautician,
      data: services,
    });
  } catch (err) {
    console.log(err);
    res
      .status(code.internalServerError)
      .json({ status: true, message: service.error.fetchByBeautician });
  }
};

const filterServices = async (req, res) => {
  const { name, location, beauticianId } = req.query;

  try {
    salonsQueary = { beautician: beauticianId };
    if (location) salonsQueary.location = new RegExp(location, "i");

    const salons = await Salon.find(salonsQueary);
    console.log(salons);
    const salonIds = salons.map((salon) => new ObjectId(salon._id));
    query = {};
    if (name) {
      query.name = new RegExp(name, "i");
    }
    query.salon = { $in: salonIds };
    const services = await Service.find(query).populate("salon");
    res.status(code.ok).json({
      status: true,
      message: service.success.fetchedByNameAndLocation,
      data: services,
    });
  } catch (err) {
    res
      .status(code.internalServerError)
      .json({ status: false, message: service.error.fetchedByNameAndLocation });
  }
};

const filterByPriceRange = async (req, res) => {
  const { minPrice, maxPrice, beauticianId } = req.query;

  try {
    salonsQueary = { beautician: beauticianId };
    const salons = await Salon.find(salonsQueary);
    const salonIds = salons.map((salon) => new ObjectId(salon._id));

    const query = {
      salon: { $in: salonIds },
      price: { $gte: minPrice, $lte: maxPrice },
    };
    const services = await Service.find(query).populate("salon");
    res.status(code.ok).json({
      status: true,
      message: service.success.fetchedByPriceRange,
      data: services,
    });
  } catch (err) {
    res
      .status(code.internalServerError)
      .json({ status: false, message: service.error.fetchedByPriceRange });
  }
};

const sortServicesByPrice = async (req, res) => {
  try {
    const { sortBy, order, beauticianId } = req.query;

    salonsQueary = { beautician: beauticianId };
    const salons = await Salon.find(salonsQueary);
    const salonIds = salons.map((salon) => new ObjectId(salon._id));

    const sortQuery = {};
    sortQuery[sortBy] = order === "asc" ? 1 : -1;

    const services = await Service.find({ salon: { $in: salonIds } })
      .sort(sortQuery)
      .populate("salon");
    res.status(code.ok).json({
      status: true,
      message: service.success.sortByPrice,
      data: services,
    });
  } catch (err) {
    console.log(err);
    res
      .status(code.internalServerError)
      .json({ status: false, message: service.error.sortByPrice });
  }
};

const searchByServiceType = async (req, res) => {
  const { type, beauticianId } = req.query;
  try {
    salonsQueary = { beautician: beauticianId };
    const salons = await Salon.find(salonsQueary);
    const salonIds = salons.map((salon) => new ObjectId(salon._id));

    const services = await Service.find({
      salon: { $in: salonIds },
      type: new RegExp(type, "i"),
    }).populate("salon");
    res.status(code.ok).json({
      status: true,
      message: service.success.fetchedByServiceType,
      data: services,
    });
  } catch (err) {
    res
      .status(code.internalServerError)
      .json({ status: false, message: service.error.fetchedByServiceType });
  }
};
const unifiedSearch = async (req, res) => {
  const {
    beauticianId,
    name,
    location,
    minPrice,
    maxPrice,
    sortBy,
    order,
    type,
  } = req.query;

  try {
    let salonsQuery = { beautician: beauticianId };
    if (location) salonsQuery.location = new RegExp(location, "i");

    const salons = await Salon.find(salonsQuery);
    const salonIds = salons.map((salon) => new ObjectId(salon._id));

    let query = { salon: { $in: salonIds } };

    if (name) query.name = new RegExp(name, "i");
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (type) query.type = new RegExp(type, "i");

    let services;
    if (sortBy) {
      const sortQuery = {};
      sortQuery[sortBy] = order === "asc" ? 1 : -1;
      services = await Service.find(query).sort(sortQuery).populate("salon");
    } else {
      services = await Service.find(query).populate("salon");
    }

    res.status(code.ok).json({
      status: true,
      message: service.success.genericSuccessMessage,
      data: services,
    });
  } catch (err) {
    res
      .status(code.internalServerError)
      .json({ status: false, message: service.error.genericErrorMessage });
  }
};

module.exports = {
  getServicesByBeautician,
  filterServices,
  filterByPriceRange,
  sortServicesByPrice,
  searchByServiceType,
  unifiedSearch,
};
