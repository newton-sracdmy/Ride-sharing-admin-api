const RideService = require("../services/RideService");

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

        const { id:rideId} = ctx.request.query;
        if (!rideId) {
            return res.status(400).json({ message: "Ride ID is required" });
          }

        const ride  = await RideService.getRideById(rideId);
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

module.exports = { getAllRides, getRideById };
