const mongoose = require("mongoose");
const LocationSchema = require("./Location");
const RideRequest = require("./RideRequest");
const User = require("./Users");
const Vehicle = require("./Vehicles");
const { RIDE_STATUS, CAR_TYPES, TRIP_TYPES, COLLECTIONNAME } = require("../constants/enums");
const { BreakDetailsSchema, PassengerDetailsSchema, StatusHistorySchema } = require("./statusHistory");

const rideSchema = new mongoose.Schema(
  {
    rideRequest: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.RIDE_REQUEST,
      required: true
    },

    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.USER,
      required: true 
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.USER, 
      required: true 
    },

    vehicle: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.VEHICLES,
      required: true 
    },

    pickup: {
      type: LocationSchema, 
      required: true
    },

    destination: {
      type: LocationSchema,
      required: true
    },
   
    stops: {
      type:BreakDetailsSchema,
       required:false
      },

    fare: {
      baseFare: { type: Number, default: 0 },
      serviceChargePassenger: { type: Number, default: 0 },
      serviceChargeDriver: { type: Number, default: 0 },
      totalFare: { type: Number, default: 0 },
    },
   
    passenger: {
      type: PassengerDetailsSchema,
      required: false
     },
    
     requestedSeats: {
      type: Number,
      required: false
     },

    carType: { 
      type: String, 
      enum: CAR_TYPES, 
      required: true 
    },

    bookingNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },

    isRoundTrip: { 
      type: Boolean,
      default: false 
    },

    additionalNotes: {
      type: String, 
      required:false
    },

    status: { 
      type: String, 
      enum: RIDE_STATUS,
      default:RIDE_STATUS.OPEN,
      required: true
    },

    tripType:{
      type: String,   
      enum:TRIP_TYPES,
      required: true
    },

    statusUpdatedAt:{
      type: Date,
      required:false
    },

    expiredAt: {
      type: Date,
      required:false
    },

    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    cancelReasons: {
      type: [String],
    },

    statusHistories: [StatusHistorySchema],
  },
  { timestamps: true }
);

const Ride = mongoose.model(COLLECTIONNAME.RIDE, rideSchema);
module.exports = Ride;
