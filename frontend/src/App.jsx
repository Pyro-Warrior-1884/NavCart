import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, MapPin, ZoomIn, ZoomOut } from 'lucide-react';

const App = () => {
  // -----------------------------
  // NODES (unchanged)
  // -----------------------------
  const nodes = {
    'dairy_top': { x: 130, y: 48, label: 'Dairy' },
    'baby_junction': { x: 333, y: 78, label: 'Baby Section' },
    'baby_shoes': { x: 457, y: 78, label: 'Shoes' },
    'electronics': { x: 600, y: 78, label: 'Electronics' },
    'books_junction': { x: 641, y: 78, label: 'Books' },
    'toys': { x: 790, y: 78, label: 'Toys' },
    'sporting_goods': { x: 1030, y: 78, label: 'Sporting Goods' },
    'auto_care': { x: 1100, y: 80, label: 'Auto Care' },
    'grocery_mid': { x: 260, y: 185, label: 'Grocery' },
    'produce_junction': { x: 260, y: 310, label: 'Produce' },
    'seafood': { x: 51, y: 310, label: 'Sea Food' },
    'meat_poultry': { x: 51, y: 155, label: 'Meat & Poultry' },
    'bakery_junction': { x: 67, y: 348, label: 'Bakery' },
    'girls_junction': { x: 365, y: 78, label: 'Girls' },
    'women_junction': { x: 260, y: 268, label: 'Women' },
    'boys_junction': { x: 484, y: 80, label: 'Boys' },
    'men_junction': { x: 570, y: 80, label: 'Men' },
    'fitting_exit': { x: 677, y: 238, label: 'Fitting Room Exit' },
    'home_decor': { x: 677, y: 130, label: 'Home Decor' },
    'home_office': { x: 677, y: 193, label: 'Home Office' },
    'celebrate': { x: 677, y: 261, label: 'Celebrate' },
    'jeweller': { x: 677, y: 304, label: 'Jeweller/Accessories' },
    'storage_laundry': { x: 836, y: 130, label: 'Storage & Laundry' },
    'home_mid': { x: 836, y: 193, label: 'Home Mid' },
    'kitchen_dining': { x: 836, y: 249, label: 'Kitchen & Dining' },
    'seasonal': { x: 836, y: 311, label: 'Seasonal' },
    'fabric': { x: 1100, y: 123, label: 'Fabric' },
    'bedding': { x: 1100, y: 189, label: 'Bedding' },
    'paint_hardware': { x: 1100, y: 159, label: 'Paint & Hardware' },
    'bath': { x: 1100, y: 276, label: 'Bath' },
    'cosmetics': { x: 1000, y: 351, label: 'Cosmetics' },
    'deli_entrance': { x: 195, y: 405, label: 'Deli' },
    'main_entrance': { x: 278, y: 423, label: 'Main Entrance' },
    'left_entrance': { x: 170, y: 405, label: 'Left Entrance' },
    'checkouts_1': { x: 380, y: 355, label: 'Checkouts 1' },
    'checkouts_2': { x: 700, y: 355, label: 'Checkouts 2' },
    'right_entrance': { x: 840, y: 400, label: 'Right Entrance' },
    'pharmacy': { x: 980, y: 450, label: 'Pharmacy' },
    'hair_salon': { x: 870, y: 400, label: 'Hair Salon' },
    'health_beauty': { x: 980, y: 410, label: 'Health & Beauty' },
    'pet_care': { x: 1102, y: 358, label: 'Pet Care' },
    'garden_center': { x: 1170, y: 350, label: 'Garden Center' },
    'red_junction_1': { x: 260, y: 358, label: 'Junction 1' },
    'red_junction_2': { x: 677, y: 358, label: 'Junction 2' },
    'red_junction_3': { x: 836, y: 358, label: 'Junction 3' },
    'red_junction_4': { x: 1102, y: 340, label: 'Junction 4' },
    'red_junction_5': { x: 260, y: 80, label: 'Junction 5'},
    'red_junction_6': { x: 836, y: 80, label: 'Junction 6' },
    'red_junction_7': { x: 677, y: 80, label: 'Junction 7' },
    'red_junction_8': { x: 280, y: 400, label: 'Junction 8' }
  };

  // -----------------------------
  // CONNECTIONS (fixed typos so all keys exist)
  // -----------------------------
  const connections = {
    'dairy_top': ['meat_poultry', 'red_junction_5'],
    'baby_junction': ['girls_junction', 'red_junction_5'],
    'baby_shoes': ['boys_junction', 'girls_junction'],
    'electronics': ['men_junction', 'books_junction'],
    'books_junction': ['red_junction_7', 'toys'],
    'toys': ['red_junction_6', 'red_junction_7'],
    'sporting_goods': ['red_junction_6', 'auto_care'],
    'auto_care': ['sporting_goods', 'fabric'],
    'grocery_mid': ['red_junction_5', 'women_junction'],
    'produce_junction': ['women_junction', 'red_junction_1'],
    'seafood': ['bakery_junction', 'meat_poultry'],
    'meat_poultry': ['dairy_top', 'seafood'],
    'bakery_junction': ['seafood', 'red_junction_1'],
    'girls_junction': ['baby_junction', 'baby_shoes'],
    'women_junction': ['produce_junction','grocery_mid'],
    'boys_junction': ['baby_shoes', 'men_junction'],
    'men_junction': ['boys_junction','electronics'],
    'home_decor': ['red_junction_7', 'home_office'],
    'home_office': ['home_decor', 'celebrate'],
    'celebrate': ['home_office', 'jeweller'],
    'jeweller': ['celebrate', 'red_junction_2'],
    'storage_laundry': ['red_junction_6', 'home_mid'],
    'home_mid': ['storage_laundry', 'kitchen_dining'],
    'kitchen_dining': ['home_mid','seasonal'],
    'seasonal': ['kitchen_dining', 'red_junction_3'],
    'fabric': ['auto_care', 'paint_hardware'],
    'bedding': ['paint_hardware', 'bath'],
    'paint_hardware': ['fabric', 'bedding'],
    'bath': ['bedding', 'red_junction_4'],
    'cosmetics': ['red_junction_4', 'red_junction_3'],
    'deli_entrance': ['left_entrance', 'red_junction_8'],
    'main_entrance': ['red_junction_8'],
    'left_entrance': ['deli_entrance'],
    'checkouts_1': ['red_junction_1', 'red_junction_2'],
    'checkouts_2': ['red_junction_2', 'red_junction_3'],
    'right_entrance': ['red_junction_3', 'hair_salon'],
    'pharmacy': ['health_beauty'],
    'hair_salon': ['right_entrance', 'health_beauty'],
    'health_beauty': ['hair_salon', 'pharmacy'],
    'pet_care': ['red_junction_4'],
    'garden_center': ['red_junction_4'],
    'red_junction_1': ['red_junction_8', 'checkouts_1', 'bakery_junction', 'produce_junction'],
    'red_junction_2': ['jeweller', 'checkouts_1', 'checkouts_2'],
    'red_junction_3': ['checkouts_2', 'right_entrance', 'seasonal', 'cosmetics'],
    'red_junction_4': ['pet_care', 'garden_center', 'cosmetics', 'bath'],
    'red_junction_5': ['grocery_mid', 'dairy_top', 'baby_junction'],
    'red_junction_6': ['storage_laundry', 'toys', 'sporting_goods'],
    'red_junction_7': ['toys', 'books_junction', 'home_decor'],
    'red_junction_8': ['main_entrance', 'deli_entrance']
  };

  // -----------------------------
  // STATE
  // -----------------------------
  const [currentPath, setCurrentPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [selectedSections, setSelectedSections] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [Entrance, setEntrance] = useState("");
  const [isComputing, setIsComputing] = useState(false);
  const [computeMsg, setComputeMsg] = useState('');
  const storeImageData = "/Walmart.png";

  // -----------------------------
  // GEOMETRY + A* (strictly uses connections)
  // -----------------------------
  const distXY = (a, b) => {
    const dx = nodes[a].x - nodes[b].x;
    const dy = nodes[a].y - nodes[b].y;
    return Math.hypot(dx, dy);
  };

  const heuristic = (a, b) => distXY(a, b);

  const findPathAStar = (start, goal) => {
    if (start === goal) return [start];

    const open = new Set([start]);
    const came = {};
    const g = {};
    const f = {};
    const closed = new Set();

    for (const k of Object.keys(nodes)) {
      g[k] = Infinity;
      f[k] = Infinity;
    }
    g[start] = 0;
    f[start] = heuristic(start, goal);

    while (open.size > 0) {
      // get node with min f
      let current = null;
      let bestF = Infinity;
      for (const n of open) {
        if (f[n] < bestF) {
          bestF = f[n];
          current = n;
        }
      }

      if (current === goal) {
        const out = [current];
        while (came[current]) {
          current = came[current];
          out.unshift(current);
        }
        return out;
      }

      open.delete(current);
      closed.add(current);

      for (const nb of (connections[current] || [])) {
        if (!nodes[nb]) continue;        // guard: unknown key
        if (closed.has(nb)) continue;

        const tentative = g[current] + distXY(current, nb); // edge cost = allowed edge length
        if (!open.has(nb)) open.add(nb);
        if (tentative >= g[nb]) continue;

        came[nb] = current;
        g[nb] = tentative;
        f[nb] = tentative + heuristic(nb, goal);
      }
    }

    // unreachable
    return null;
  };

  // -----------------------------
  // All-pairs calculator + fast TSP (NN + 2-opt)
  // -----------------------------
  const precompute = (points) => {
    const D = {};
    const P = {};
    for (const a of points) { D[a] = {}; P[a] = {}; }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const path = findPathAStar(a, b);
        const d = path ? pathDistance(path) : Infinity;
        D[a][b] = D[b][a] = d;
        P[a][b] = P[b][a] = path; // may be null if unreachable
      }
    }
    return { D, P };
  };

  const pathDistance = (path) => {
    let d = 0;
    for (let i = 1; i < path.length; i++) d += distXY(path[i-1], path[i]);
    return d;
  };

  const nearestNeighborOrder = (start, targets, D) => {
    const remaining = new Set(targets);
    const order = [];
    let cur = start;
    while (remaining.size) {
      let best = null, bestD = Infinity;
      for (const t of remaining) {
        const dd = D[cur][t];
        if (dd < bestD) { bestD = dd; best = t; }
      }
      if (best == null || bestD === Infinity) break; // stop if anything unreachable
      order.push(best);
      remaining.delete(best);
      cur = best;
    }
    // If something was unreachable, we stop early; caller will handle
    return order;
  };

  const twoOptImprove = (start, seq, D, maxPasses = 2) => {
    if (seq.length < 3) return seq.slice();
    let path = seq.slice();
    let improved = true;
    let passes = 0;

    const total = (s) => {
      let acc = D[start][s[0]];
      for (let i = 0; i < s.length - 1; i++) acc += D[s[i]][s[i+1]];
      return acc;
    };

    while (improved && passes < maxPasses) {
      improved = false;
      for (let i = 0; i < path.length - 1; i++) {
        for (let k = i + 1; k < path.length; k++) {
          const newSeq = path.slice(0, i).concat(path.slice(i, k + 1).reverse(), path.slice(k + 1));
          if (total(newSeq) + 1e-6 < total(path)) {
            path = newSeq;
            improved = true;
          }
        }
      }
      passes++;
    }
    return path;
  };

  // Builds the final full path with checkouts + best exit
  const computeOptimizedPath = (start, targets) => {
    setComputeMsg('Building distance cache…');
    const exits = ['main_entrance', 'left_entrance', 'right_entrance'];
    const checkouts = ['checkouts_1', 'checkouts_2'];

    const points = [start, ...targets, ...checkouts, ...exits];
    const { D, P } = precompute(points);

    // Guard: if any target is completely unreachable from start, stop early
    for (const t of targets) {
      if (!P[start][t]) throw new Error(`No path from ${nodes[start].label} to ${nodes[t].label}`);
    }

    setComputeMsg('Finding fast visiting order…');
    const seed = nearestNeighborOrder(start, targets, D);
    if (seed.length !== targets.length) {
      const bad = targets.filter(t => !seed.includes(t));
      throw new Error(`Unreachable stops: ${bad.map(k => nodes[k].label).join(', ')}`);
    }
    const order = twoOptImprove(start, seed, D, 2);

    // Choose nearest checkout from last stop
    const lastStop = order[order.length - 1] ?? start;
    let bestCheckout = checkouts[0];
    let bestCheckoutD = D[lastStop][bestCheckout];
    for (const c of checkouts) {
      if (D[lastStop][c] < bestCheckoutD) {
        bestCheckout = c; bestCheckoutD = D[lastStop][c];
      }
    }
    if (!isFinite(bestCheckoutD)) {
      throw new Error(`No path from last stop to any checkout.`);
    }

    // Choose nearest exit from the chosen checkout
    let bestExit = exits[0];
    let bestExitD = D[bestCheckout][bestExit];
    for (const e of exits) {
      if (D[bestCheckout][e] < bestExitD) {
        bestExit = e; bestExitD = D[bestCheckout][e];
      }
    }
    if (!isFinite(bestExitD)) {
      throw new Error(`No path from checkout to any exit.`);
    }

    // Stitch the full node-by-node path
    setComputeMsg('Stitching final path…');
    const stops = [start, ...order, bestCheckout, bestExit];
    let fullPath = [stops[0]];
    for (let i = 0; i < stops.length - 1; i++) {
      const seg = P[stops[i]][stops[i+1]];
      if (!seg) throw new Error(`No path between ${nodes[stops[i]].label} and ${nodes[stops[i+1]].label}`);
      fullPath = fullPath.concat(seg.slice(1)); // avoid duplicate node at join
    }

    return { fullPath, stopOrder: stops };
  };

  // -----------------------------
  // UI controls
  // -----------------------------
  const startNavigation = async () => {
    if (!Entrance) {
      alert('⚠ Please select an entrance before starting navigation!');
      return;
    }

    const shoppingSections = [ 'dairy_top', 'baby_junction', 'baby_shoes', 'electronics', 'books_junction', 'toys', 'sporting_goods', 'auto_care', 'grocery_mid', 'produce_junction', 'seafood', 'meat_poultry', 'bakery_junction', 'girls_junction', 'women_junction', 'boys_junction', 'men_junction', 'home_decor', 'home_office', 'celebrate', 'jeweller', 'storage_laundry', 'home_mid', 'kitchen_dining', 'seasonal', 'fabric', 'bedding', 'paint_hardware', 'bath', 'cosmetics', 'deli_entrance', 'pharmacy', 'hair_salon', 'health_beauty', 'pet_care', 'garden_center' ];

    setIsComputing(true);
    setComputeMsg('Starting…');

    
    setTimeout(() => {
      try {
        const { fullPath, stopOrder } = computeOptimizedPath(Entrance, shoppingSections);
        setSelectedSections(stopOrder); 
        setCurrentPath(fullPath);
        setAnimationStep(0);
        setIsAnimating(true);
      } catch (err) {
        console.error(err);
        alert(`Route error: ${err.message}`);
      } finally {
        setIsComputing(false);
        setComputeMsg('');
      }
    }, 30);
  };

  const resetNavigation = () => {
    setCurrentPath([]);
    setSelectedSections([]);
    setAnimationStep(0);
    setIsAnimating(false);
    setEntrance("");
    setIsComputing(false);
    setComputeMsg('');
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.4));

  useEffect(() => {
    if (isAnimating && animationStep < currentPath.length - 1) {
      const timer = setTimeout(() => setAnimationStep(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    } else if (isAnimating && animationStep >= currentPath.length - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, animationStep, currentPath.length]);

  // -----------------------------
  // STYLES (unchanged)
  // -----------------------------
  const containerStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: isAnimating ? '#9ca3af' : '#2563eb',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4b5563',
    color: 'white'
  };

  const zoomButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#059669',
    color: 'white'
  };

  const mapContainerStyle = {
    position: 'relative',
    backgroundColor: 'white',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '0 auto',
    width: `${1320 * zoomLevel + 40}px`,
    height: `${507 * zoomLevel + 40}px`,
    maxWidth: '100%',
    maxHeight: '90vh',
    transition: 'width 0.3s ease, height 0.3s ease'
  };

  const mapBackgroundStyle = {
    position: 'relative',
    width: `${1320 * zoomLevel}px`,
    height: `${507 * zoomLevel}px`,
    backgroundImage: `url("${storeImageData}")`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    margin: '20px auto',
    transition: 'width 0.3s ease, height 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
          Store Navigation System
        </h2>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label htmlFor="entrance" style={{ fontWeight: '600', color: '#374151' }}>
            Select Entrance:
          </label>
          <select
            id="entrance"
            value={Entrance}
            onChange={(e) => setEntrance(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#fff',
              fontSize: '14px',
              color: '#374151',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            <option value="">-- Choose Entrance --</option>
            <option value="main_entrance">Main Entrance</option>
            <option value="left_entrance">Left Entrance</option>
            <option value="right_entrance">Right Entrance</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={startNavigation}
            disabled={!Entrance || isAnimating || isComputing}
            style={{
              ...primaryButtonStyle,
              opacity: Entrance && !isComputing ? 1 : 0.5,
              cursor: Entrance && !isComputing ? 'pointer' : 'not-allowed'
            }}
          >
            <Play size={16} />
            Start Navigation
          </button>

          <button onClick={resetNavigation} style={secondaryButtonStyle}>
            <RotateCcw size={16} />
            Reset
          </button>

          <button onClick={zoomIn} style={zoomButtonStyle}>
            <ZoomIn size={16} />
            Zoom In
          </button>

          <button onClick={zoomOut} style={zoomButtonStyle}>
            <ZoomOut size={16} />
            Zoom Out
          </button>

          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#374151'
            }}
          >
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        </div>

        {selectedSections.length > 0 && (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#dbeafe',
              border: '1px solid #93c5fd',
              borderRadius: '8px'
            }}
          >
            <h3 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>Shopping Route:</h3>
            <div style={{ fontSize: '14px', color: '#1d4ed8' }}>
              {selectedSections.map(section => nodes[section]?.label).join(' → ')}
            </div>
          </div>
        )}
      </div>

      <div style={mapContainerStyle}>
        {/* loader overlay */}
        {isComputing && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.8)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <div className="spinner" />
            <div style={{ color: '#111827', fontWeight: 600 }}>{computeMsg || 'Computing route…'}</div>
            <style>{`
              .spinner {
                width: 36px; height: 36px; border: 4px solid #93c5fd;
                border-top-color: #1d4ed8; border-radius: 50%;
                animation: spin 0.9s linear infinite;
              }
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        )}

        <div style={mapBackgroundStyle}>
          {Object.entries(nodes).map(([key, node]) => {
            const isInPath = currentPath.includes(key);
            const baseSize = isInPath ? 16 : 12;
            const scaledSize = baseSize * zoomLevel;
            const nodeStyle = {
              position: 'absolute',
              left: `${(node.x * zoomLevel) - (scaledSize / 2)}px`,
              top: `${(node.y * zoomLevel) - (scaledSize / 2)}px`,
              width: `${scaledSize}px`,
              height: `${scaledSize}px`,
              backgroundColor: isInPath ? '#3b82f6' : 'white',
              border: `${Math.max(2 * zoomLevel, 1)}px solid ${isInPath ? '#1d4ed8' : '#374151'}`,
              borderRadius: '50%',
              zIndex: 100,
              boxShadow: `0 ${2 * zoomLevel}px ${4 * zoomLevel}px rgba(0,0,0,0.3)`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            };

            return <div key={key} style={nodeStyle} title={node.label} />;
          })}

          {currentPath.map((nodeKey, index) => {
            if (index === 0 || index > animationStep) return null;

            const prevNode = nodes[currentPath[index - 1]];
            const currentNode = nodes[nodeKey];
            if (!prevNode || !currentNode) return null;

            const length = Math.hypot(
              (currentNode.x - prevNode.x) * zoomLevel,
              (currentNode.y - prevNode.y) * zoomLevel
            );

            const angle =
              (Math.atan2(
                (currentNode.y - prevNode.y) * zoomLevel,
                (currentNode.x - prevNode.x) * zoomLevel
              ) *
                180) /
              Math.PI;

            const lineStyle = {
              position: 'absolute',
              left: `${prevNode.x * zoomLevel}px`,
              top: `${(prevNode.y * zoomLevel) - (2 * zoomLevel)}px`,
              width: `${length}px`,
              height: `${4 * zoomLevel}px`,
              backgroundColor: '#ef4444',
              transformOrigin: '0 50%',
              transform: `rotate(${angle}deg)`,
              zIndex: 90,
              boxShadow: `0 0 ${6 * zoomLevel}px rgba(239, 68, 68, 0.6)`,
              borderRadius: `${2 * zoomLevel}px`
            };

            return <div key={`path-${index}`} style={lineStyle} />;
          })}

          {isAnimating && animationStep < currentPath.length && (
            <div
              style={{
                position: 'absolute',
                left: `${(nodes[currentPath[animationStep]]?.x * zoomLevel) - (15 * zoomLevel)}px`,
                top: `${(nodes[currentPath[animationStep]]?.y * zoomLevel) - (15 * zoomLevel)}px`,
                width: `${30 * zoomLevel}px`,
                height: `${30 * zoomLevel}px`,
                backgroundColor: '#dc2626',
                border: `${3 * zoomLevel}px solid white`,
                borderRadius: '50%',
                zIndex: 110,
                boxShadow: `0 ${4 * zoomLevel}px ${8 * zoomLevel}px rgba(0,0,0,0.4)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite'
              }}
            >
              <MapPin size={16 * zoomLevel} color="white" />
            </div>
          )}

          {currentPath.length > 0 && (
            <>
              <div
                style={{
                  position: 'absolute',
                  left: `${(nodes[currentPath[0]]?.x * zoomLevel) - (12 * zoomLevel)}px`,
                  top: `${(nodes[currentPath[0]]?.y * zoomLevel) - (12 * zoomLevel)}px`,
                  width: `${24 * zoomLevel}px`,
                  height: `${24 * zoomLevel}px`,
                  backgroundColor: '#16a34a',
                  border: `${2 * zoomLevel}px solid white`,
                  borderRadius: '50%',
                  zIndex: 105,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 ${2 * zoomLevel}px ${6 * zoomLevel}px rgba(0,0,0,0.3)`,
                  fontSize: `${12 * zoomLevel}px`,
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                S
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: `${(nodes[currentPath[currentPath.length - 1]]?.x * zoomLevel) - (12 * zoomLevel)}px`,
                  top: `${(nodes[currentPath[currentPath.length - 1]]?.y * zoomLevel) - (12 * zoomLevel)}px`,
                  width: `${24 * zoomLevel}px`,
                  height: `${24 * zoomLevel}px`,
                  backgroundColor: '#9333ea',
                  border: `${2 * zoomLevel}px solid white`,
                  borderRadius: '50%',
                  zIndex: 105,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 ${2 * zoomLevel}px ${6 * zoomLevel}px rgba(0,0,0,0.3)`,
                  fontSize: `${12 * zoomLevel}px`,
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                E
              </div>
            </>
          )}
        </div>
      </div>

      {isAnimating && (
        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#15803d', fontWeight: '600' }}>
                Currently at: {nodes[currentPath[animationStep]]?.label || 'Unknown'}
              </div>
              <div style={{ fontSize: '14px', color: '#16a34a', marginTop: '4px' }}>
                Step {animationStep + 1} of {currentPath.length}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '14px', color: '#15803d' }}>
              {currentPath.length > animationStep + 1 && (
                <div>Next: {nodes[currentPath[animationStep + 1]]?.label}</div>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: '12px',
              width: '100%',
              height: '8px',
              backgroundColor: '#bbf7d0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: '#16a34a',
                borderRadius: '4px',
                transition: 'width 0.5s ease',
                width: `${((animationStep + 1) / currentPath.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
        <p><strong>Instructions:</strong></p>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '8px' }}>
          <li>Use zoom controls to scale the map and navigate</li>
          <li>White dots are navigation nodes (only these connections are valid)</li>
          <li>Blue dots = nodes on the computed route</li>
          <li>Red lines = walkable edges between consecutive nodes</li>
          <li>Green ‘S’ = start, Purple ‘E’ = final exit</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default App;
