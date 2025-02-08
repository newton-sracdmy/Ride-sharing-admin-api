const mongoose = require("mongoose");

const rideRequestSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    pickup: {
      district: { type: String, required: true },
      upazila: { type: String, required: true },
      long_lat: { type: [Number], required: true },
      union: { type: String, required: true }
    },

    destination: {
      long_lat: { type: [Number], required: true },
      union: { type: String, required: true },
      upazila: { type: String, required: true },
      district: { type: String, required: true }
    },

    carType: { type: String, required: true }, 
    isRoundTrip: { type: Boolean, required: true },
    status: { 
      type: String, 
      enum: ["open", "closed", "pending"], 
      required: true 
    },

    rideType: { 
      type: String, 
      enum: ["instant", "scheduled"], 
      required: true 
    },

    expiredAt: { 
      type: Date, 
      required: true 
    },

    date: { 
      type: Date, 
      required: true 
    },

    time: { type: String, required: true },

    statusHistories: [
      {
        status: { 
          type: String, 
          enum: ["open", "closed", "pending"], 
          required: true 
        },
        timestamp: { 
          type: Date, 
          required: true 
        }
      }
    ]
  },
  { timestamps: true }
);

const RideRequest = mongoose.model("RideRequest", rideRequestSchema);
module.exports = RideRequest;
