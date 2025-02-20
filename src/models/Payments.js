const mongoose = require("mongoose");
const { PAYMENT_STATUS, COLLECTIONNAME } = require("../constants/enums");

const { Schema, model, Types } = mongoose;

const PaymentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: COLLECTIONNAME.USER,
      required: true,
    },
    ride: {
      type: Types.ObjectId,
      ref: COLLECTIONNAME.RIDE,
      required: true,
    },
    ticket: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: COLLECTIONNAME.TICKET
      }, 

    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: PAYMENT_STATUS,
      default: PAYMENT_STATUS.DUE,
    },
    transactionDetails: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    collection: COLLECTIONNAME.PAYMENT,
    timestamps: true,
  }
);

module.exports = mongoose.model(COLLECTIONNAME.PAYMENT, PaymentSchema);
