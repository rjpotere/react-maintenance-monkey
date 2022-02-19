const { Schema, model } = require('mongoose');

const garageSchema = new Schema({
  vinNumber: {
    type: String,
    required: 'Vehicle VIN Number is required',
    trim: true,
  },
  vehicleYear: {
    type: String,
    required: true,
    trim: true,
  },
  vehicleMake: {
    type: String,
    required: true,
    trim: true,
  },
  vehicleModel: {
    type: String,
    required: true,
    trim: true,
  },
  maintenance: [
    {
      serviceType: {
        type: String,
        required: true,
      },
      serviceMileage: {
        type: String,
        required: true,
      },
      serviceNotes: {
        type: String,
        required: false,
      },
    },
  ],
});

const Garage = model('Garage', garageSchema);

module.exports = Garage;



//vehicleYear
//vehicleMake
//vehicleModel


//maintenance: [
//serviceType
//serviceMileage
//serviceNote
//]

