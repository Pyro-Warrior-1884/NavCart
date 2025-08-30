// deleteAll.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // loads .env

// Load models
const Item = require('./src/models/Item');
const Edge = require('./src/models/Edge'); // Only if you have this
const NodeModel = require('./src/models/Node'); // Make sure this path matches your project

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all docs
    await Item.deleteMany({});
    console.log('🗑 All Items deleted');

    if (Edge) {
      await Edge.deleteMany({});
      console.log('🗑 All Edges deleted');
    }

    if (NodeModel) {
      await NodeModel.deleteMany({});
      console.log('🗑 All Nodes deleted');
    }

    // If you want to drop entire DB
    // await mongoose.connection.dropDatabase();
    // console.log('💥 Entire database dropped');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit();
  } catch (err) {
    console.error('❌ Error wiping database:', err.message);
    process.exit(1);
  }
};

start();
