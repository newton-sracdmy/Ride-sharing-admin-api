const Rides = require("../models/Rides");

const getAllRides = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const rides = await Rides.find()
      // .populate("User") 
      // .populate("driver") 
      // .populate("vehicle")
      .skip(skip)
      .limit(limit);

    const totalRides = await Rides.countDocuments();

    return {
      totalRides,
      totalPages: Math.ceil(totalRides / limit),
      currentPage: page,
      rides,
    };
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw new Error("Error fetching rides");
  }
};

const getRideById = async (rideId) => {
  const ride = await Rides.findById(rideId)
  // .populate("rideRequest")
  // .populate("user", "name email")
  // .populate("driver", "name phoneNumber")
  // .populate("vehicle", "model licensePlate");
  return { data: ride, status: 200 };
}



module.exports = { getAllRides , getRideById};
