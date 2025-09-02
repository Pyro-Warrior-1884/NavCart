// Pathfinding utility functions

// Dijkstra's algorithm for shortest paths between given nodes
export function dijkstraAllPairs(nodes, connections, keyNodes) {
  const result = {};
  keyNodes.forEach(start => {
    const distances = {};
    const previous = {};
    const visited = {};

    Object.keys(nodes).forEach(n => {
      distances[n] = Infinity;
      previous[n] = null;
    });

    distances[start] = 0;
    const queue = [[0, start]];

    while (queue.length) {
      queue.sort(([a], [b]) => a - b);
      const [, node] = queue.shift();
      if (visited[node]) continue;
      visited[node] = true;

      for (const neighbor of connections[node] || []) {
        if (!(neighbor in nodes)) continue;
        const alt = distances[node] + 1;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = node;
          queue.push([alt, neighbor]);
        }
      }
    }

    result[start] = {};
    keyNodes.forEach(end => {
      if (distances[end] === Infinity) {
        result[start][end] = { distance: Infinity, path: null };
      } else {
        const path = [];
        let curr = end;
        while (curr !== start) {
          path.push(curr);
          curr = previous[curr];
          if (curr === null) break;
        }
        path.push(start);
        path.reverse();
        result[start][end] = { distance: distances[end], path };
      }
    });
  });
  return result;
}

// Greedy nearest neighbor path order
export function greedyVisitOrder(start, targets, allDist) {
  const unvisited = new Set(targets);
  let current = start;
  const order = [];

  while (unvisited.size > 0) {
    let nearest = null;
    let minDist = Infinity;
    unvisited.forEach(t => {
      const dist = allDist[current]?.[t]?.distance ?? Infinity;
      if (dist < minDist) {
        minDist = dist;
        nearest = t;
      }
    });
    if (!nearest) break;
    order.push(nearest);
    unvisited.delete(nearest);
    current = nearest;
  }
  return order;
}

// Find nearest node helper
export function findNearest(from, pool, allDist) {
  let minNode = null;
  let minDist = Infinity;
  pool.forEach(node => {
    const dist = allDist[from]?.[node]?.distance ?? Infinity;
    if (dist < minDist) {
      minDist = dist;
      minNode = node;
    }
  });
  return minNode;
}

// Main hybrid path calculation
export function computeHybridPath(start, targets, nodes, connections, checkouts, exits) {
  const keySet = [start, ...targets, ...checkouts, ...exits];
  const allDist = dijkstraAllPairs(nodes, connections, keySet);

  const visitOrder = greedyVisitOrder(start, targets, allDist);

  let fullPath = [];
  let prev = start;

  visitOrder.forEach(target => {
    if (!allDist[prev] || !allDist[prev][target]) return;
    let path = allDist[prev][target].path;
    if (!path) return;
    if (fullPath.length > 0) path = path.slice(1);
    fullPath = fullPath.concat(path);
    prev = target;
  });

  const nearestCheckout = findNearest(prev, checkouts, allDist);
  if (nearestCheckout && allDist[prev]?.[nearestCheckout]?.path) {
    fullPath = fullPath.concat(allDist[prev][nearestCheckout].path.slice(1));
    prev = nearestCheckout;
  }

  const nearestExit = findNearest(prev, exits, allDist);
  if (nearestExit && allDist[prev]?.[nearestExit]?.path) {
    fullPath = fullPath.concat(allDist[prev][nearestExit].path.slice(1));
  }

  const stopOrder = [start, ...visitOrder, nearestCheckout, nearestExit].filter(Boolean);

  return { fullPath, stopOrder };
}
