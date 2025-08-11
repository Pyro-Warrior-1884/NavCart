// src/models/Node.js
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  nodeId: { type: String, required: true, unique: true }, // e.g., "A1", "ENTRANCE", "CHECKOUT1"
  floor: { type: String, default: 'G' }, // optional floor identifier
  coords: { // coordinates relative to SVG (use same coordinate system as your SVG)
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  meta: { type: mongoose.Schema.Types.Mixed } // optional metadata
});

module.exports = mongoose.model('Node', nodeSchema);
