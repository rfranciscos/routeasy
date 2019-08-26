const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliveriesSchema = new Schema(
  {
    customer: { type: String, required: true },
    weight: { type: Number, required: true },
    address: {
      route: { type: String, required: true },
      Number: { type: Number, required: true },
      neighborhood: { type: String, required: true },
      complement: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true }
    },
    Geolocation: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true }
    }
  },
  {
    timestamps: true
  }
);

const Deliveries = mongoose.model('deliveries', DeliveriesSchema);

module.exports = Deliveries;
