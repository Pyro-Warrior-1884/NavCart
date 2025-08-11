// src/controllers/itemController.js
const Item = require('../models/Item');

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getItemByName = async (req, res) => {
  try {
    const name = req.params.name;
    const items = await Item.find({ name: new RegExp(`^${name}$`, 'i') });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getItems, addItem, getItemByName };
