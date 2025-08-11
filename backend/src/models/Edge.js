// src/models/Edge.js
const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  from: { type: String, required: true }, // nodeId
  to: { type: String, required: true },   // nodeId
  weight: { type: Number, required: true } // distance / time cost
});

edgeSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('Edge', edgeSchema);
