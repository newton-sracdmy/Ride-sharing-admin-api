const mongoose = require("mongoose");
const User = require("./Users");
const COACH = require("./Coaches");
const { COLLECTIONNAME, TICKET_STATUS } = require("../constants/enums");

const ticketSchema = new mongoose.Schema(
  {
    fare: {
      type: Number,
    },
    pnr: {
      type: String,
    //   required: true,
    //   unique: true,
    },
    seat: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.USER,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTIONNAME.COACH,
    },
    status: {
      type: String,
      enum: TICKET_STATUS,
      default: TICKET_STATUS.AVAILABLE,
    },
    expiredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model(COLLECTIONNAME.TICKET, ticketSchema);

