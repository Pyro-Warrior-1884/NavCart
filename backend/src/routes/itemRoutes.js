// src/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getItems, addItem, getItemByName } = require('../controllers/itemController');

router.get('/', getItems);
router.post('/', addItem);
router.get('/by-name/:name', getItemByName);

module.exports = router;
