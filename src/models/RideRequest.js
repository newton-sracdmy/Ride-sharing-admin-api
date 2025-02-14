const mongoose = require("mongoose");
const { CAR_TYPES, RIDE_STATUS, RIDE_TYPES, TRIP_TYPES } = require("../constants/enums");
const User = require("./Users");
const LocationSchema = require("./Location");
const { PassengerDetailsSchema, BreakDetailsSchema, StatusHistorySchema } = require("./statusHistory");


const Schema = mongoose.Schema;

const RideRequestSchema = new Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
     // required: true
    },

    pickup: {
      type: LocationSchema, 
     // required: true
    },

    destination: {
      type: LocationSchema,
    //  required: true
    },
    
    stops: {
    type:BreakDetailsSchema,
     required:false
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
     // required: true 
    }, 

    isRoundTrip: { 
      type: Boolean, 
      required: false
    },

    additionalNotes: {
      type: String,
      required:false
    },

    status: { 
      type: String, 
      enum: RIDE_STATUS, 
      default: RIDE_STATUS.OPEN,
     // required: true 
    },
  
    rideType: { 
      type: String, 
      enum: RIDE_TYPES, 
     // required: true 
    },

    tripType: { 
      type: String, 
      enum: TRIP_TYPES, 
     // required: true 
    },

    cancelReasons: {
      type: [String],
      default: []
    },

    expiredAt: { 
      type: Date, 
    //  required: true 
    },
     
    statusUpdatedAt: {
      type: Date,
      required: false
     }
     ,
    date: { 
      type: Date, 
     // required: true 
    },

    time: { 
      type: String, 
     // required: true 
    },

    statusHistories: [StatusHistorySchema],
  },
  { timestamps: true }
);

const RideRequest = mongoose.model("RideRequest", RideRequestSchema);
module.exports = RideRequest;
