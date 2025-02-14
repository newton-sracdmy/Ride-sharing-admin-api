const mongoose = require("mongoose");
const { RIDE_STATUS } = require("../constants/enums");

const Schema = mongoose.Schema;

const StatusHistorySchema = new Schema({
  status: {
    type: String,
    enum: RIDE_STATUS, 
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const PassengerDetailsSchema = {
  name: {
    type: String,
    required: false
  },
  phone: {
    type: String, 
    required: false
  }
 }
 const  BreakDetailsSchema ={
  note:{
    type:String,
  },
  timeRequiredInMinute:{
    type:Number,
  }
 }

module.exports = {StatusHistorySchema, PassengerDetailsSchema, BreakDetailsSchema};
