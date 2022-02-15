const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const garageSchema = new Schema({
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
    trim: true,
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
  vehicleModel: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  maintenance: [
    {
      service: {
        type: String,
      },
      serviceMileage: {
          type: String,
      },
      serviceNote: {
          type: String,
          required: false,
          maxlength: 240,
      },
      serviceDate: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Garage = ('Garage', garageSchema);

model.exports = Garage;
