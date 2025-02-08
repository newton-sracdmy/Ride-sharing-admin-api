const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    rideRequest: { type: mongoose.Schema.Types.ObjectId, ref: "RideRequest", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    pickup: {
      long_lat: { type: [Number], required: true },
      district: String,
      upazila: String,
      union: String,
    },
    destination: {
      long_lat: { type: [Number], required: true },
      district: String,
      upazila: String,
      union: String,
    },
    fare: {
      baseFare: Number,
      serviceChargePassenger: Number,
      serviceChargeDriver: Number,
      totalFare: Number,
    },
    carType: { type: String, required: true },
    bookingNumber: { type: String, required: true, unique: true },
    isRoundTrip: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "accepted", "completed", "cancelled"], required: true },
    statusHistories: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
