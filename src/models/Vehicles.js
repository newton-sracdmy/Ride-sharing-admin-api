const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    driver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Driver", 
      required: true 
    },

    driverDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true }
    },

    name: { type: String, required: true }, 
    type: { type: String, required: true }, 
    model_year: { type: String, required: true }, 

    car_number: {
      part_1: { type: String, required: true },
      part_2: { type: String, required: true },
      part_3: { type: String, required: true }
    },

    smart_card: {
      front: { type: String, required: true },
      back: { type: String, required: true }
    },

    fitness_paper: { type: String, required: true },
    tax_registration: { type: String, required: true },

    car_image: {
      front: { type: String, required: true },
      back: { type: String, required: true },
      inside: { type: String, required: true }
    },

    color: { type: String, required: true },
    ac: { type: String, enum: ["yes", "no"], required: true }, 
    status: { type: String, enum: ["available", "unavailable"], required: true }, 

  },
  { timestamps: true } 
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
