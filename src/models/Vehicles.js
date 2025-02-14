const mongoose = require('mongoose');
const { VEHICLE_STATUS } = require('../constants/enums');
const { Schema } = mongoose;

const UserDetailsSchema = new Schema({
  name: String,
  phone: String
});

const CarNumberSchema = new Schema({
  part_1: String,
  part_2: String,
  part_3: String
});

const DocumentIdentificationSchema = new Schema({
  front: String,
  back: String
});

const CarDetailsImageSchema = new Schema({
  front: String,
  back: String,
  inside: String
});


const VehicleSchema = new Schema({
  approver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ownerDetails: {
    type: UserDetailsSchema
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  driverDetails: {
    type: UserDetailsSchema
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  model_year: {
    type: String
  },
  car_number: {
    type: CarNumberSchema
  },
  smart_card: {
    type: DocumentIdentificationSchema
  },
  fitness_paper: {
    type: String
  },
  tax_registration: {
    type: String
  },
  car_image: {
    type: CarDetailsImageSchema
  },
  color: {
    type: String
  },
  ac: {
    type: String
  },
  status: {
    type: String,
    enum: VEHICLE_STATUS,
    default: VEHICLE_STATUS.NEED_APPROVAL
  }
}, {
  timestamps: true
});

VehicleSchema.index({ driver: 1 });
VehicleSchema.index(
  { 
    driver: 1,
    'car_number.part_1': 1,
    'car_number.part_2': 1,
    'car_number.part_3': 1
  },
  { unique: true }
);

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;