// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Node = require('../src/models/Node');
const Edge = require('../src/models/Edge');
const Item = require('../src/models/Item');

(async () => {
  try {
    await connectDB();
    // Clear existing
    await Node.deleteMany({});
    await Edge.deleteMany({});
    await Item.deleteMany({});

    // Create nodes (simple layout)
    const nodes = [
      { nodeId: 'ENTRANCE', coords: { x: 10, y: 10 }, floor: 'G' },
      { nodeId: 'A1', coords: { x: 50, y: 20 }, floor: 'G' },
      { nodeId: 'A2', coords: { x: 100, y: 20 }, floor: 'G' },
      { nodeId: 'A3', coords: { x: 150, y: 20 }, floor: 'G' },
      { nodeId: 'A4', coords: { x: 100, y: 80 }, floor: 'G' },
      { nodeId: 'CHECKOUT1', coords: { x: 180, y: 10 }, floor: 'G' }
    ];
    await Node.insertMany(nodes);

    // Edges (bidirectional)
    const edges = [
      { from: 'ENTRANCE', to: 'A1', weight: 5 },
      { from: 'A1', to: 'A2', weight: 6 },
      { from: 'A2', to: 'A3', weight: 6 },
      { from: 'A2', to: 'A4', weight: 10 },
      { from: 'A3', to: 'CHECKOUT1', weight: 10 },
      { from: 'A4', to: 'CHECKOUT1', weight: 12 }
    ];
    await Edge.insertMany(edges);

    // Items
    const items = [
      { name: 'Milk', nodeId: 'A1', aisle: 'A1' },
      { name: 'Eggs', nodeId: 'A2', aisle: 'A2' },
      { name: 'Bread', nodeId: 'A4', aisle: 'A4' },
      { name: 'Soap', nodeId: 'A3', aisle: 'A3' }
    ];
    await Item.insertMany(items);

    console.log('✅ Seed completed');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
