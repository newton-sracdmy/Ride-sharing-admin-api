const mongoose = require('mongoose');
const { COLLECTIONNAME, LOCATION_TYPE } = require('../constants/enums');

const { Schema, Types } = mongoose;

const RideLocationSchema = new Schema(
  {
    name: {
      type: String,
    },
    parent: {
      type: String,
      ref: COLLECTIONNAME.RIDE_LOCATION,
    },
    type: {
      type: String,
      enum: LOCATION_TYPE, 
      default:LOCATION_TYPE.DISTRICT ,
    },
    district: {
      type: String,
    },
    upazila: {
      type: String,
    },
    union: {
      type: String,
    },
  },
  {
    collection: COLLECTIONNAME.RIDE_LOCATION,
    timestamps: true,
  }
);

module.exports = mongoose.model(COLLECTIONNAME.RIDE_LOCATION, RideLocationSchema);
