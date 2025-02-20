const mongoose = require("mongoose");
const { COLLECTIONNAME, COACH_TYPE, COACH_STATUS } = require("../constants/enums");

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    logo: {
      type: String,
    },
    company: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    departurePoint: {
      type: String,
    },
    coachNumber: {
      type: String,
    },
    type: {
      type: String,
      enum:COACH_TYPE,
      required: true,
    },
    status: {
      type: String,
      enum: COACH_STATUS,
      default: COACH_STATUS.AVAILABLE,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.USER,
    },
    expiredAt: {
      type: Date,
    },
    fare: {
      type: Number,
    },
    managerNumber: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model(COLLECTIONNAME.COACH, coachSchema );

