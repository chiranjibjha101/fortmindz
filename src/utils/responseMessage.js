module.exports = {
  newUser: {
    success: {
      created: "User created successfully",
      logedIn: "User logged in successfully",
    },
    error: {
      error: "error",
      alreadyRegistered: "You are already registered. Please login!",
      wrongCredentials: "You Have Entered wrong Credentials",
    },
  },
  service: {
    success: {
      fetchedAll: "All services fetched successfully",
      fetchedByBeautician: "Services for the beautician fetched successfully",
      fetchedByNameAndLocation: "Services fetched for name and location",
      fetchedByPriceRange: "Services fetched for the Price Range",
      sortByPrice: "Services Sorted By Price",
      fetchedByServiceType: "Services fetched by Service Type",
      genericSuccessMessage: "Services Fetched Successfully",
    },
    error: {
      general: "An error occurred while processing your request for services",
      fetchAll: "Failed to fetch all services",
      fetchByBeautician: "Failed to fetch services for the beautician",
      fetchedByNameAndLocation:
        "Failed to fetch Services for name and location",
      fetchedByPriceRange:
        "Failed to fetch Services Services for the Price Range",
      sortByPrice: "Failed to sort by price",
      fetchedByServiceType: "Failed to fetch Services by Type",
      genericSuccessMessage: "Failed To Fetch Services",
    },
  },
  beauticians: {
    success: { fetchedBeautician: "List of beauticans fetched successfully" },
    error: { fetchedBeautician: "Failed to fetch beauticans list" },
  },
  appointment: {
    success: {
      created: "Appointment created successfully",
      fetchedByService: "Appointments fetched successfully based on service",
    },
    error: {
      create: "Failed to create appointment",
      slotAlreadyBooked: "Appointment slot is already booked",
      fetchByService: "Failed to fetch appointments based on service",
      salon: "Salon Does not exist",
      beautician: "Beautician Does not exist",
      service: "Service Does not exist",
    },
  },
  salons: {
    success: {
      sortByRatings: "Salons Fetched By ratings",
    },
    error: {
      sortByRatings: "Failed to fetch Salons By ratings",
    },
  },
};
