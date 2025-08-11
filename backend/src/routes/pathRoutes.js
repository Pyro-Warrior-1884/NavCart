// src/routes/pathRoutes.js
const express = require('express');
const router = express.Router();
const { optimizedPath } = require('../controllers/pathController');

// POST /api/path/optimize
// body: { items: ["Milk", "Eggs"], startNode: "ENTRANCE", checkoutNodes: ["CHECKOUT1","CHECKOUT2"] }
router.post('/optimize', optimizedPath);

module.exports = router;
