const { RIDE_STATUS } = require("../constants/enums");
const RideRequest = require("../models/RideRequest");
const Rides = require("../models/Rides");
const User = require("../models/Users");

const getAllRides = async () => {
  try {
    const rides = await Rides.find()
      .populate("rideRequest")
      .populate("user") 
      .populate("driver") 
      .populate("vehicle")

    return {
      rides,
    };
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw new Error("Error fetching rides");
  }
};

const getRideById = async (id) => {
  const ride = await Rides.findById(id)
  .populate("rideRequest")
  .populate("user")
  .populate("driver")
  .populate("vehicle");
  return { data: ride, status: 200 };
}

const getRidesSummary = async () =>{
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const numbersOfRides = await Rides.countDocuments();
const completedRides = await Rides.countDocuments({ status: RIDE_STATUS.COMPLETED });
const last7DaysRides = await Rides.find({ createdAt: { $gte: sevenDaysAgo } });
const totalRidesLast7Days = last7DaysRides.length;
const completedRidesLast7Days = last7DaysRides.filter(ride => ride.status === RIDE_STATUS.COMPLETED).length;
const runningRidesLast7Days = last7DaysRides.filter(ride => ride.status === RIDE_STATUS.IN_PROGRESS).length;
const cancelledRidesLast7Days = last7DaysRides.filter(ride => ride.status === RIDE_STATUS.CANCELLED).length;

const today = new Date();
  today.setHours(0, 0, 0, 0);

const todayRides = await Rides.find({ createdAt: { $gte: today } });
  const totalRidesToday = todayRides.length;
  const completedRidesToday = todayRides.filter(ride => ride.status === RIDE_STATUS.COMPLETED).length;
  const runningRidesToday = todayRides.filter(ride => ride.status === RIDE_STATUS.IN_PROGRESS).length;
  const cancelledRidesToday = todayRides.filter(ride => ride.status === RIDE_STATUS.CANCELLED).length;
  return {
    totalRides:{
      totalRides:numbersOfRides,
      completedRides:completedRides
    },
    last7DaysRideStatistics: {
      totalRides: totalRidesLast7Days,
      completedRides: completedRidesLast7Days,
      runningRides: runningRidesLast7Days,
      cancelledRides: cancelledRidesLast7Days,
    },
    todaysRides: {
      totalRides: totalRidesToday,
      completedRides: completedRidesToday,
      runningRides: runningRidesToday,
      cancelledRides: cancelledRidesToday,
    },
  };
}
module.exports = { getAllRides , getRideById , getRidesSummary};
