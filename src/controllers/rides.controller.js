const RideService = require("../services/RideService");
const UserService = require("../services/userService");

const getAllRides = async (ctx) => {
  try {
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 10;
    const rideData = await RideService.getAllRides(page, limit);
    ctx.status = 200;
    ctx.body = { success: true, data: rideData };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: "Internal server error", error };
  }
};

const  getRideById = async  (ctx) => {

    try {

        const { id } = ctx.params;
        if (!id) {
            return res.status(400).json({ message: "Ride ID is required" });
          }

        const ride  = await RideService.getRideById(id);
        if (!ride) {
            return { error: "Ride not found", status: 404 };
          }
         ctx.status = 200;
         ctx.body = { success: true, data:ride };
  
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: "Internal server error", error };
      }
}


const getRidesSummary = async (ctx) => {
  try {
    const approvedDrivers = await UserService.getApprovedDrivers();
    const unapprovedDrivers = await UserService.getUnapprovedDrivers();
     
    const {  totalRides, last7DaysRideStatistics, todaysRides} = await RideService.getRidesSummary();
    
    const { activeDrivers, inactiveDrivers} = await UserService. getDriversToday();
    
    ctx.body = {
      ridesSummary: {
        totalRides,
        approvedDrivers,
        unapprovedDrivers,
        
      },
      last7DaysRideStatistics: last7DaysRideStatistics,
      todaysRides: {
        ...todaysRides,
        activeDrivers,
        inactiveDrivers,
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};

module.exports = { getAllRides, getRideById, getRidesSummary };
