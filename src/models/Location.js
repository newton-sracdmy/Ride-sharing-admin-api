const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  long_lat: {
    type: [Number],
  },
  union: {
    type: String,
  },
  upazila: {
    type: String,
  },
  district: {
    type: String,   
  },
});

module.exports = LocationSchema;
