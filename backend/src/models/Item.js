// src/models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },     // "Milk"
  sku: { type: String },                      // optional SKU
  nodeId: { type: String },   // nodeId where the item is located e.g., "A3"
  aisle: { type: String },                    // optional textual aisle
  category: { type: String },
  coords: {                                   // duplicate coords optional for convenience
    x: { type: Number },
    y: { type: Number }
  },
  qty: { type: Number, default: 1 }
});

module.exports = mongoose.model('Item', itemSchema);
