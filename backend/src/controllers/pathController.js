// src/controllers/pathController.js
const Item = require('../models/Item');
const Node = require('../models/Node');
const Edge = require('../models/Edge');
const graphUtils = require('../utils/graphUtils');

const optimizedPath = async (req, res) => {
  try {
    const { items = [], startNode = 'ENTRANCE', checkoutNodes = [] } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Provide items array' });
    }

    // 1) Resolve each product name to an item document (take first match)
    // Note: you could improve by selecting nearest in case of duplicates.
    const foundItems = await Item.find({ name: { $in: items } });

    if (foundItems.length === 0) {
      return res.status(400).json({ error: 'No matching items found in DB' });
    }

    // Build list of target nodeIds (unique)
    const targetNodeIds = Array.from(new Set(foundItems.map(it => it.nodeId)));

    // Ensure start and end nodes exist in Node collection
    const allNodeIds = [startNode, ...targetNodeIds, ...checkoutNodes];

    // 2) Build adjacency graph from Edge collection
    const edges = await Edge.find();
    const nodes = await Node.find({ nodeId: { $in: allNodeIds } });

    // If some required nodes missing from Node collection, still proceed but warn
    // Build adjacency map for graphUtils
    const adjacency = graphUtils.buildAdjacency(edges);

    // 3) Compute pairwise shortest path distances between relevant nodes (start, targets, checkouts)
    const relevantNodeIds = Array.from(new Set(allNodeIds));
    const distanceMatrix = {};
    const pathMap = {}; // pathMap[src][dst] = array of nodeIds representing shortest path

    for (const src of relevantNodeIds) {
      const result = graphUtils.dijkstra(adjacency, src);
      distanceMatrix[src] = {};
      pathMap[src] = {};
      for (const dst of relevantNodeIds) {
        if (src === dst) {
          distanceMatrix[src][dst] = 0;
          pathMap[src][dst] = [src];
        } else {
          const dist = result.distances[dst];
          const prev = result.previous;
          distanceMatrix[src][dst] = typeof dist === 'number' ? dist : Infinity;
          pathMap[src][dst] = graphUtils.reconstructPath(prev, src, dst);
        }
      }
    }

    // 4) Choose best checkout to end at: will be decided by TSP solver (we'll compute with all checkouts)
    // 5) Solve TSP variant: fixed start, visit all targets, end at one of checkoutNodes
    const tspResult = graphUtils.solveTSPWithCheckouts({
      startNode,
      targetNodes: targetNodeIds,
      checkoutNodes,
      distanceMatrix
    });

    // 6) Reconstruct full path as sequence of nodeIds using pathMap
    const sequence = tspResult.sequence; // array of nodeIds e.g. [start, A1, A3, .., CHECKOUT2]
    const fullPathNodeIds = [];
    for (let i = 0; i < sequence.length - 1; i++) {
      const a = sequence[i], b = sequence[i + 1];
      const segment = pathMap[a][b] || [];
      // Avoid duplicating the connecting node
      if (i === 0) fullPathNodeIds.push(...segment);
      else fullPathNodeIds.push(...segment.slice(1));
    }

    // 7) Fetch node coordinates for the path for frontend rendering
    const uniqueNodeIds = Array.from(new Set(fullPathNodeIds));
    const nodeDocs = await Node.find({ nodeId: { $in: uniqueNodeIds } });
    const coordsById = {};
    nodeDocs.forEach(n => (coordsById[n.nodeId] = n.coords));

    // Map fullPathNodeIds to coords
    const fullPath = fullPathNodeIds.map(id => ({ nodeId: id, coords: coordsById[id] || null }));

    res.json({
      success: true,
      tsp: tspResult,
      sequence,
      fullPath
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { optimizedPath };
