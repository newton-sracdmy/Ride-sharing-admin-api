const mongoose = require('mongoose');
const { ACCOUNT_TYPE, ACCOUNT_STATUS, COLLECTIONNAME } = require('../constants/enums');
const { Schema } = mongoose;

const DocumentIdentificationSchema = new Schema({
  front: String,
  back: String
});

const LocationLongLatSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: false
  },
  coordinates: {
    type: [Number],
    required: false
  }
});

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },

  experience: {
    type: String
  },

  approver: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONNAME.USER
  },

  type: { type: String, enum: ACCOUNT_TYPE, default: ACCOUNT_TYPE.ADMIN },
  status: { type: String, enum: ACCOUNT_STATUS, default: ACCOUNT_STATUS.ACTIVE },

  nid: {
    type: DocumentIdentificationSchema
  },

  driving_license: {
    type: DocumentIdentificationSchema
  },

  tripCount: {
    type: Number,
    default: 0,
    required: false
  },

  cancellationCount: {
    type: Number,
    default: 0,
    required: false
  },

  blockUntil: {
    type: Date,
    default: null,
    required: false
  },

  rating: {
    type: Number,
    default: 0,
    required: false
  },

  long_lat: {
    type: LocationLongLatSchema,
    required: false
  },

  fcmToken: {
    type: String,
    select: false
  },

  blood_group: {
    type: String,
    required: false
  },

  gender: {
    type: String,
    required: false
  },
  emergency_contact: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  }
},{
  timestamps: true
});

// UserSchema.index({ type: 1, phone: 1 }, { unique: true });
// UserSchema.index({ long_lat: '2dsphere' });

const User = mongoose.model(COLLECTIONNAME.USER, userSchema);

module.exports = User;