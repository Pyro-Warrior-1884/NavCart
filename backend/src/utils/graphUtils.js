// src/utils/graphUtils.js

/**
 * adjacency format:
 * {
 *   nodeId1: { nodeId2: weight, nodeId3: weight, ... },
 *   nodeId2: { nodeId1: weight, ... }
 * }
 */

function buildAdjacency(edges) {
  const adj = {};
  edges.forEach(e => {
    const { from, to, weight } = e;
    if (!adj[from]) adj[from] = {};
    if (!adj[to]) adj[to] = {};
    adj[from][to] = weight;
    adj[to][from] = weight; // undirected
  });
  return adj;
}

// Simple priority queue using array (works fine for modest graph sizes)
function pqPush(pq, node, priority) {
  pq.push({ node, priority });
  pq.sort((a, b) => a.priority - b.priority);
}
function pqPop(pq) {
  return pq.shift();
}

// Dijkstra: returns { distances: {node:dist}, previous: {node: prevNode} }
function dijkstra(adjacency, start) {
  const distances = {};
  const previous = {};
  const nodes = Object.keys(adjacency);

  nodes.forEach(n => {
    distances[n] = Infinity;
    previous[n] = null;
  });
  if (!adjacency[start]) {
    // Starting node not in adjacency: still return structure
    distances[start] = 0;
    return { distances, previous };
  }

  distances[start] = 0;
  const pq = [];
  pqPush(pq, start, 0);

  while (pq.length) {
    const { node: u } = pqPop(pq);
    const distU = distances[u];
    const neighbors = adjacency[u] || {};
    for (const v of Object.keys(neighbors)) {
      const alt = distU + neighbors[v];
      if (alt < (distances[v] ?? Infinity)) {
        distances[v] = alt;
        previous[v] = u;
        pqPush(pq, v, alt);
      }
    }
  }
  return { distances, previous };
}

// Reconstruct path from previous map produced by dijkstra
function reconstructPath(previous, start, target) {
  if (start === target) return [start];
  const path = [];
  let cur = target;
  // If target isn't reachable previous[cur] may be undefined
  while (cur != null) {
    path.push(cur);
    if (cur === start) break;
    cur = previous[cur];
  }
  if (path[path.length - 1] !== start) {
    return []; // no path
  }
  return path.reverse();
}

/* TSP heuristics:
   - Given a distanceMatrix of relevant nodes, we compute an ordering:
     start -> permutation of targets -> checkout
   - We'll try each checkout as possible endpoint, select best total distance.
   - For ordering targets we run nearest neighbor starting from start,
     then run 2-opt improvement.
*/

// Helper to compute total distance of sequence using distanceMatrix
function totalDistanceOfSequence(seq, distanceMatrix) {
  let total = 0;
  for (let i = 0; i < seq.length - 1; i++) {
    const a = seq[i], b = seq[i + 1];
    const d = distanceMatrix[a] && distanceMatrix[a][b];
    if (d === undefined || d === Infinity) return Infinity;
    total += d;
  }
  return total;
}

// Nearest Neighbor to build route visiting all targets, starting at startNode, ending at checkout
function nearestNeighborOrder(startNode, targets, distanceMatrix) {
  const remaining = new Set(targets);
  const order = [];
  let current = startNode;
  while (remaining.size > 0) {
    let best = null;
    let bestDist = Infinity;
    for (const t of remaining) {
      const d = distanceMatrix[current] && distanceMatrix[current][t];
      if (d !== undefined && d < bestDist) {
        bestDist = d;
        best = t;
      }
    }
    if (best === null) {
      // some targets unreachable
      // push remaining arbitrarily to break loop
      for (const r of remaining) order.push(r);
      remaining.clear();
      break;
    }
    order.push(best);
    remaining.delete(best);
    current = best;
  }
  return order; // sequence of target nodes (without start)
}

// 2-opt improvement for a route array (sequence of targets), mutate and return improved
function twoOptImprove(route, startNode, endNode, distanceMatrix) {
  // full sequence will be [startNode, ...route, endNode] when evaluating
  let improved = true;
  const n = route.length;
  if (n <= 1) return route;
  while (improved) {
    improved = false;
    for (let i = 0; i < n - 1; i++) {
      for (let k = i + 1; k < n; k++) {
        // build candidate by reversing route[i..k]
        const newRoute = route.slice(0, i)
          .concat(route.slice(i, k + 1).reverse())
          .concat(route.slice(k + 1));
        const fullOld = [startNode].concat(route).concat([endNode]);
        const fullNew = [startNode].concat(newRoute).concat([endNode]);
        const distOld = totalDistanceOfSequence(fullOld, distanceMatrix);
        const distNew = totalDistanceOfSequence(fullNew, distanceMatrix);
        if (distNew < distOld) {
          route = newRoute;
          improved = true;
        }
        if (improved) break;
      }
      if (improved) break;
    }
  }
  return route;
}

// Solve TSP variant with multiple checkout options
function solveTSPWithCheckouts({ startNode, targetNodes = [], checkoutNodes = [], distanceMatrix }) {
  // if no checkoutNodes provided, treat route end as last visited target
  if (!checkoutNodes || checkoutNodes.length === 0) {
    // treat dummy checkout as last target
    const initialOrder = nearestNeighborOrder(startNode, targetNodes, distanceMatrix);
    const improved = twoOptImprove(initialOrder, startNode, targetNodes[initialOrder.length - 1] || startNode, distanceMatrix);
    const sequence = [startNode, ...improved];
    return { sequence, totalDistance: totalDistanceOfSequence(sequence, distanceMatrix), chosenCheckout: null };
  }

  let best = { sequence: null, totalDistance: Infinity, chosenCheckout: null };

  for (const checkout of checkoutNodes) {
    // NN to produce order of targets
    const orderTargets = nearestNeighborOrder(startNode, targetNodes, distanceMatrix);
    // 2-opt (endNode is checkout)
    const improvedTargets = twoOptImprove(orderTargets, startNode, checkout, distanceMatrix);
    // full sequence
    const sequence = [startNode, ...improvedTargets, checkout];
    const total = totalDistanceOfSequence(sequence, distanceMatrix);
    if (total < best.totalDistance) {
      best = { sequence, totalDistance: total, chosenCheckout: checkout };
    }
  }

  // As small improvement, try if switching start-to-target permutations helps by trying NN from each target as second node? (optional)
  return best;
}

module.exports = {
  buildAdjacency,
  dijkstra,
  reconstructPath,
  solveTSPWithCheckouts
};
