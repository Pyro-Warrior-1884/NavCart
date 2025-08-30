import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, MapPin, ZoomIn, ZoomOut } from 'lucide-react';

const App = () => {
  // Node coordinates based on the exact blueprint analysis
  const nodes = {
    // Top row nodes (following the white circles in the image)
    'dairy_top': { x: 130, y: 48, label: 'Dairy' },
    'baby_junction': { x: 333, y: 78, label: 'Baby Section' },
    'baby_shoes': { x: 427, y: 78, label: 'Baby-Shoes' },
    'electronics': { x: 535, y: 78, label: 'Electronics' },
    'books_junction': { x: 641, y: 78, label: 'Books' },
    'toys': { x: 730, y: 78, label: 'Toys' },
    'sporting_goods': { x: 958, y: 78, label: 'Sporting Goods' },
    'auto_care': { x: 1118, y: 78, label: 'Auto Care' },

    // Left column nodes
    'grocery_mid': { x: 51, y: 155, label: 'Grocery' },
    'produce_junction': { x: 51, y: 310, label: 'Produce' },
    'bakery_junction': { x: 67, y: 348, label: 'Bakery' },

    // Central area nodes
    'girls_junction': { x: 260, y: 140, label: 'Girls' },
    'women_junction': { x: 260, y: 268, label: 'Women' },
    'central_bottom': { x: 257, y: 348, label: 'Central Bottom' },

    // Clothing area nodes
    'boys_junction': { x: 484, y: 158, label: 'Boys' },
    'men_junction': { x: 598, y: 158, label: 'Men' },
    'fitting_left': { x: 484, y: 238, label: 'Fitting Room Left' },
    'fitting_right': { x: 677, y: 158, label: 'Fitting Room Right' },
    'fitting_exit': { x: 677, y: 238, label: 'Fitting Room Exit' },

    // Home sections (right side)
    'home_decor': { x: 739, y: 130, label: 'Home Decor' },
    'home_office': { x: 739, y: 193, label: 'Home Office' },
    'celebrate': { x: 739, y: 261, label: 'Celebrate' },
    'jeweller': { x: 739, y: 304, label: 'Jeweller/Accessories' },

    'storage_laundry': { x: 836, y: 130, label: 'Storage & Laundry' },
    'home_mid': { x: 836, y: 193, label: 'Home Mid' },
    'kitchen_dining': { x: 836, y: 249, label: 'Kitchen & Dining' },
    'seasonal': { x: 836, y: 311, label: 'Seasonal' },

    'fabric': { x: 1052, y: 123, label: 'Fabric' },
    'bedding': { x: 1052, y: 189, label: 'Bedding' },
    'bath': { x: 1052, y: 276, label: 'Bath' },
    'cosmetics': { x: 1052, y: 311, label: 'Cosmetics' },

    // Bottom area nodes
    'deli_entrance': { x: 195, y: 405, label: 'Deli' },
    'main_entrance': { x: 278, y: 423, label: 'Main Entrance' },
    'left_entrance': { x: 170, y: 405, label: 'Left Entrance' },
    'checkouts_1': { x: 380, y: 355, label: 'Checkouts' },
    'checkouts_2': { x: 558, y: 423, label: 'Checkouts' },
    'right_entrance': { x: 810, y: 423, label: 'Right Entrance' },
    'pharmacy': { x: 839, y: 423, label: 'Pharmacy' },
    'health_beauty': { x: 1035, y: 433, label: 'Health & Beauty' },
    'pet_care': { x: 1129, y: 433, label: 'Pet Care' },

    // Red marker positions (special junctions)
    'red_junction_1': { x: 260, y: 358, label: 'Junction 1' },
    'red_junction_2': { x: 677, y: 358, label: 'Junction 2' },
    'red_junction_3': { x: 836, y: 358, label: 'Junction 3' },
    'red_junction_4': { x: 1102, y: 358, label: 'Junction 4' }
  };

  // Define connections based on the white line connections visible in the blueprint
  const connections = {
    // Top horizontal connections
    'dairy_top': ['baby_junction', 'grocery_mid'],
    'baby_junction': ['dairy_top', 'baby_shoes', 'girls_junction'],
    'baby_shoes': ['baby_junction', 'electronics'],
    'electronics': ['baby_shoes', 'books_junction', 'boys_junction'],
    'books_junction': ['electronics', 'toys'],
    'toys': ['books_junction', 'sporting_goods', 'home_decor'],
    'sporting_goods': ['toys', 'auto_care', 'fabric'],
    'auto_care': ['sporting_goods'],

    // Left vertical connections
    'grocery_mid': ['dairy_top', 'produce_junction', 'girls_junction'],
    'produce_junction': ['grocery_mid', 'bakery_junction', 'women_junction'],
    'bakery_junction': ['produce_junction', 'deli_entrance'],

    // Central vertical connections
    'girls_junction': ['baby_junction', 'grocery_mid', 'boys_junction', 'women_junction'],
    'women_junction': ['girls_junction', 'produce_junction', 'fitting_left', 'central_bottom'],
    'central_bottom': ['women_junction', 'red_junction_1', 'main_entrance'],

    // Clothing area connections
    'boys_junction': ['girls_junction', 'electronics', 'men_junction', 'fitting_left'],
    'men_junction': ['boys_junction', 'fitting_right'],
    'fitting_left': ['boys_junction', 'women_junction', 'fitting_exit'],
    'fitting_right': ['men_junction', 'fitting_exit', 'home_decor'],
    'fitting_exit': ['fitting_left', 'fitting_right', 'red_junction_2'],

    // Home sections connections
    'home_decor': ['toys', 'fitting_right', 'home_office', 'storage_laundry'],
    'home_office': ['home_decor', 'celebrate', 'home_mid'],
    'celebrate': ['home_office', 'jeweller', 'kitchen_dining'],
    'jeweller': ['celebrate', 'seasonal'],

    'storage_laundry': ['home_decor', 'home_mid', 'fabric'],
    'home_mid': ['storage_laundry', 'home_office', 'kitchen_dining', 'bedding'],
    'kitchen_dining': ['home_mid', 'celebrate', 'seasonal', 'bath'],
    'seasonal': ['kitchen_dining', 'jeweller', 'cosmetics'],

    'fabric': ['sporting_goods', 'storage_laundry', 'bedding'],
    'bedding': ['fabric', 'home_mid', 'bath'],
    'bath': ['bedding', 'kitchen_dining', 'cosmetics'],
    'cosmetics': ['bath', 'seasonal', 'health_beauty'],

    // Bottom connections
    'deli_entrance': ['bakery_junction', 'main_entrance'],
    'main_entrance': ['deli_entrance', 'central_bottom', 'left_entrance', 'checkouts_1'],
    'left_entrance': ['main_entrance', 'checkouts_1'],
    'checkouts_1': ['main_entrance', 'left_entrance', 'right_entrance', 'red_junction_2'],
    'right_entrance': ['checkouts_2', 'pharmacy'],
    'pharmacy': ['right_entrance', 'health_beauty'],
    'health_beauty': ['pharmacy', 'cosmetics', 'pet_care'],
    'pet_care': ['health_beauty'],

    // Red junction connections (major pathways)
    'red_junction_1': ['central_bottom', 'red_junction_2'],
    'red_junction_2': ['red_junction_1', 'fitting_exit', 'checkouts_1', 'red_junction_3'],
    'red_junction_3': ['red_junction_2', 'seasonal', 'red_junction_4'],
    'red_junction_4': ['red_junction_3', 'cosmetics']
  };

  const [currentPath, setCurrentPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [selectedSections, setSelectedSections] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0.8); // Start at 80% to fit screen better

  // Use the Walmart.png file from public folder
  const storeImageData = "/Walmart.png";

  // Pathfinding algorithm using BFS
  const findPath = (start, end) => {
    if (start === end) return [start];
    
    const queue = [[start]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];
      
      if (current === end) {
        return path;
      }
      
      const neighbors = connections[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    
    return [start];
  };

  // Generate random shopping sections
  const generateRandomPath = () => {
    const shoppingSections = [
      'dairy_top', 'electronics', 'toys', 'sporting_goods', 'girls_junction', 
      'boys_junction', 'men_junction', 'home_decor', 'kitchen_dining', 
      'fabric', 'bedding', 'cosmetics', 'pharmacy', 'health_beauty'
    ];
    
    const numSections = Math.floor(Math.random() * 4) + 3;
    const selected = [];
    const shuffled = [...shoppingSections].sort(() => 0.5 - Math.random());
    
    selected.push('main_entrance');
    
    for (let i = 0; i < numSections && i < shuffled.length; i++) {
      selected.push(shuffled[i]);
    }
    
    selected.push('checkouts_1');
    
    return selected;
  };

  const startNavigation = () => {
    const sections = generateRandomPath();
    setSelectedSections(sections);
    
    let completePath = [];
    for (let i = 0; i < sections.length - 1; i++) {
      const segmentPath = findPath(sections[i], sections[i + 1]);
      if (i > 0) segmentPath.shift();
      completePath = [...completePath, ...segmentPath];
    }
    
    setCurrentPath(completePath);
    setAnimationStep(0);
    setIsAnimating(true);
  };

  const resetNavigation = () => {
    setCurrentPath([]);
    setSelectedSections([]);
    setAnimationStep(0);
    setIsAnimating(false);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  };

  useEffect(() => {
    if (isAnimating && animationStep < currentPath.length - 1) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isAnimating && animationStep >= currentPath.length - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, animationStep, currentPath.length]);

  // Inline styles to ensure proper rendering
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
  width: `${1320 * zoomLevel + 40}px`,  // Dynamic width + padding
  height: `${507 * zoomLevel + 40}px`,  // Dynamic height + padding
  maxWidth: '100%',                     // Ensure it doesn't overflow screen
  maxHeight: '90vh',                    // Keep it within viewport
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
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={startNavigation}
            disabled={isAnimating}
            style={primaryButtonStyle}
          >
            <Play size={16} />
            Start Navigation
          </button>
          
          <button
            onClick={resetNavigation}
            style={secondaryButtonStyle}
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={zoomIn}
            style={zoomButtonStyle}
          >
            <ZoomIn size={16} />
            Zoom In
          </button>

          <button
            onClick={zoomOut}
            style={zoomButtonStyle}
          >
            <ZoomOut size={16} />
            Zoom Out
          </button>

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '6px',
            fontSize: '14px',
            color: '#374151'
          }}>
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        </div>

        {selectedSections.length > 0 && (
          <div style={{ 
            marginBottom: '16px', 
            padding: '12px', 
            backgroundColor: '#dbeafe', 
            border: '1px solid #93c5fd',
            borderRadius: '8px' 
          }}>
            <h3 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>Shopping Route:</h3>
            <div style={{ fontSize: '14px', color: '#1d4ed8' }}>
              {selectedSections.map(section => nodes[section]?.label).join(' → ')}
            </div>
          </div>
        )}
      </div>

      <div style={mapContainerStyle}>
        <div style={mapBackgroundStyle}>
          
          {/* Render all nodes as circles that scale with the image */}
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

            return (
              <div
                key={key}
                style={nodeStyle}
                title={node.label}
              />
            );
          })}

          {/* Render path connections as red lines that scale */}
          {currentPath.map((nodeKey, index) => {
            if (index === 0 || index > animationStep) return null;
            
            const prevNode = nodes[currentPath[index - 1]];
            const currentNode = nodes[nodeKey];
            
            if (!prevNode || !currentNode) return null;
            
            const length = Math.sqrt(
              Math.pow((currentNode.x - prevNode.x) * zoomLevel, 2) + 
              Math.pow((currentNode.y - prevNode.y) * zoomLevel, 2)
            );
            
            const angle = Math.atan2(
              (currentNode.y - prevNode.y) * zoomLevel, 
              (currentNode.x - prevNode.x) * zoomLevel
            ) * (180 / Math.PI);
            
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
            
            return (
              <div key={`path-${index}`} style={lineStyle} />
            );
          })}

          {/* Current position indicator that scales */}
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

          {/* Start and end indicators that scale */}
          {currentPath.length > 0 && (
            <>
              {/* Start marker */}
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
              
              {/* End marker */}
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
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px'
        }}>
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
          
          {/* Progress bar */}
          <div style={{
            marginTop: '12px',
            width: '100%',
            height: '8px',
            backgroundColor: '#bbf7d0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div 
              style={{
                height: '100%',
                backgroundColor: '#16a34a',
                borderRadius: '4px',
                transition: 'width 1s ease',
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
          <li>White dots represent navigation nodes from your store blueprint</li>
          <li>Blue dots show the planned route</li>
          <li>Red lines display the walking path</li>
          <li>The red marker with location pin shows current position</li>
          <li>Green 'S' marks the start, Purple 'E' marks the end</li>
        </ul>
      </div>

      {/* CSS Animation for pulse effect */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default App;