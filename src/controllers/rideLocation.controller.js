
const rideLocationService = require("../services/rideLocationService");

const getAllLocations = async (ctx) => {
  try {
    const { type, parent } = ctx.query;
    const locations = await rideLocationService.getAllLocations(type, parent);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: locations,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  getAllLocations,
};
