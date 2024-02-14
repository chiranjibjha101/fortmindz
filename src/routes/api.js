const router = require("express").Router();
const passport = require("passport");
const { register, login } = require("../controllers/AuthController");
const {
  getServicesByBeautician,
  filterByPriceRange,
  sortServicesByPrice,
  searchByServiceType,
  filterServices,
  unifiedSearch,
} = require("../controllers/ServicesController");
const {
  createAppointment,
  getAppointmentsByService,
} = require("../controllers/AppointmentController");

const { getAllBeauticians } = require("../controllers/BeauticiansController");

const { sortSalonsByRatings } = require("../controllers/SalonController");
//////routes
/////
////
router.post("/register", register);
router.post("/login", login);

router.get(
  "/services/beautician/:beauticianId",
  passport.authenticate("jwt", { session: false }),
  getServicesByBeautician
);
router.get(
  "/services/filter",
  passport.authenticate("jwt", { session: false }),
  filterServices
);
router.get(
  "/services/filterByPriceRange",
  passport.authenticate("jwt", { session: false }),
  filterByPriceRange
);
router.get(
  "/services/sortByPrice",
  passport.authenticate("jwt", { session: false }),
  sortServicesByPrice
);
router.get(
  "/salons/sortByRatings",
  passport.authenticate("jwt", { session: false }),
  sortSalonsByRatings
);

router.get(
  "/services/searchByServiceType",
  passport.authenticate("jwt", { session: false }),
  searchByServiceType
);

router.get(
  "/services/unifiedSearch",
  passport.authenticate("jwt", { session: false }),
  unifiedSearch
);

router.post(
  "/appointments",
  passport.authenticate("jwt", { session: false }),
  createAppointment
);

router.get(
  "/appointments/service/:serviceId",
  passport.authenticate("jwt", { session: false }),
  getAppointmentsByService
);

router.get(
  "/beauticians",
  passport.authenticate("jwt", { session: false }),
  getAllBeauticians
);

module.exports = router;
