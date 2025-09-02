import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, MapPin, ZoomIn, ZoomOut, Navigation, Route, Target } from 'lucide-react';
import { computeHybridPath } from './pathfinding';

const FindPath = () => {
  const nodes = {
    'dairy_top': { x: 130, y: 48, label: 'Dairy' },
    'baby_junction': { x: 333, y: 78, label: 'Baby Section' },
    'turn_1': { x: 225, y: 80, label: 'Turn'},
    'turn_2': { x: 225, y: 50, label: 'Turn'},
    'turn_3': { x: 50, y: 50, label: 'Turn'},
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

  const connections = {
    'dairy_top': ['turn_3', 'turn_2'],
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
    'meat_poultry': ['turn_3', 'seafood'],
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
    'turn_1':['red_junction_5', 'turn_2'],
    'turn_2':['dairy_top', 'turn_1'],
    'turn_3':['dairy_top', 'meat_poultry'],
    'red_junction_1': ['red_junction_8', 'checkouts_1', 'bakery_junction', 'produce_junction'],
    'red_junction_2': ['jeweller', 'checkouts_1', 'checkouts_2'],
    'red_junction_3': ['checkouts_2', 'right_entrance', 'seasonal', 'cosmetics'],
    'red_junction_4': ['pet_care', 'garden_center', 'cosmetics', 'bath'],
    'red_junction_5': ['grocery_mid', 'turn_1', 'baby_junction'],
    'red_junction_6': ['storage_laundry', 'toys', 'sporting_goods'],
    'red_junction_7': ['toys', 'books_junction', 'home_decor'],
    'red_junction_8': ['main_entrance', 'deli_entrance', 'red_junction_1']
  };

  const checkouts = ['checkouts_1', 'checkouts_2'];
  const exits = ['main_entrance', 'left_entrance', 'right_entrance'];

  const [currentPath, setCurrentPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [selectedSections, setSelectedSections] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [Entrance, setEntrance] = useState("");
  const [isComputing, setIsComputing] = useState(false);
  const [computeMsg, setComputeMsg] = useState('');

  const storeImageData = "/Walmart.png";

  const startNavigation = async () => {
    if (!Entrance) {
      alert('⚠ Please select an entrance before starting navigation!');
      return;
    }

    const shoppingSections = [
      'dairy_top', 'baby_junction', 'baby_shoes', 'electronics', 'books_junction', 'toys', 'sporting_goods', 'auto_care', 'grocery_mid', 'produce_junction', 'seafood', 'meat_poultry', 'bakery_junction', 'girls_junction', 'women_junction', 'boys_junction', 'men_junction', 'home_decor', 'home_office', 'celebrate', 'jeweller', 'storage_laundry', 'home_mid', 'kitchen_dining', 'seasonal', 'fabric', 'bedding', 'paint_hardware', 'bath', 'cosmetics', 'deli_entrance', 'pharmacy', 'hair_salon', 'health_beauty', 'pet_care', 'garden_center'
    ];

    setIsComputing(true);
    setComputeMsg('Starting…');

    setTimeout(() => {
      try {
        const { fullPath, stopOrder } = computeHybridPath(
          Entrance,
          shoppingSections,
          nodes,
          connections,
          checkouts,
          exits
        );

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

  const mapContainerStyle = {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1rem',
    overflow: 'hidden',
    margin: '0 auto',
    width: `${1320 * zoomLevel + 40}px`,
    height: `${507 * zoomLevel + 40}px`,
    maxWidth: '100%',
    maxHeight: '90vh',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            padding: '0.75rem',
            borderRadius: '0.75rem'
          }}>
            <Navigation style={{ color: 'white', width: '2rem', height: '2rem' }} />
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            NavCart
          </h2>
        </div>

        {/* Entrance Selection */}
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8fafc, #ffffff)',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>
            <Target style={{ width: '1.25rem', height: '1.25rem', color: '#4f46e5' }} />
            Select Your Entrance:
          </label>
          <select
            value={Entrance}
            onChange={(e) => setEntrance(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              border: '2px solid transparent',
              borderRadius: '0.75rem',
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'all 0.3s ease',
              color: '#374151',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.border = '2px solid #4f46e5';
              e.target.style.boxShadow = '0 6px 25px rgba(79, 70, 229, 0.25)';
            }}
            onBlur={(e) => {
              e.target.style.border = '2px solid transparent';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <option value="">-- Choose Your Starting Point --</option>
            <option value="main_entrance">Main Entrance</option>
            <option value="left_entrance">Left Entrance</option>
            <option value="right_entrance">Right Entrance</option>
          </select>
        </div>

        {/* Control Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button
            onClick={startNavigation}
            disabled={!Entrance || isAnimating || isComputing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: Entrance && !isComputing ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              fontWeight: '600',
              background: Entrance && !isComputing 
                ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' 
                : 'linear-gradient(135deg, #fb5f5fff, #e46262ff)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(79, 70, 229, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (Entrance && !isComputing) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.35)';
              }
            }}
            onMouseLeave={(e) => {
              if (Entrance && !isComputing) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.25)';
              }
            }}
          >
            <Play size={18} />
            Start Navigation
          </button>

          <button
            onClick={resetNavigation}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #6b7280, #4b5563)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(107, 114, 128, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(107, 114, 128, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(107, 114, 128, 0.25)';
            }}
          >
            <RotateCcw size={18} />
            Reset
          </button>

          <button
            onClick={zoomIn}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.25)';
            }}
          >
            <ZoomIn size={18} />
            Zoom In
          </button>

          <button
            onClick={zoomOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.25)';
            }}
          >
            <ZoomOut size={18} />
            Zoom Out
          </button>

          <div style={{
            padding: '0.875rem 1.5rem',
            background: 'rgba(79, 70, 229, 0.1)',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#4f46e5',
            border: '1px solid rgba(79, 70, 229, 0.2)'
          }}>
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        </div>

        {/* Shopping Route Display */}
        {selectedSections.length > 0 && (
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
            border: '1px solid #93c5fd',
            borderRadius: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              <Route style={{ width: '1.25rem', height: '1.25rem', color: '#1e40af' }} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1e40af',
                margin: 0
              }}>
                Optimized Shopping Route:
              </h3>
            </div>
            <div style={{
              fontSize: '1rem',
              color: '#1d4ed8',
              lineHeight: '1.5',
              fontWeight: '500'
            }}>
              {selectedSections.map(section => nodes[section]?.label).join(' → ')}
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div style={mapContainerStyle}>
        {/* Loading Overlay */}
        {isComputing && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid rgba(79, 70, 229, 0.2)',
              borderTop: '4px solid #4f46e5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <div style={{
              color: '#1f2937',
              fontWeight: '600',
              fontSize: '1.125rem'
            }}>
              {computeMsg || 'Computing optimal route…'}
            </div>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        <div style={mapBackgroundStyle}>
          {/* Render Nodes */}
          {Object.entries(nodes).map(([key, node]) => {
            const isInPath = currentPath.includes(key);
            const baseSize = isInPath ? 18 : 14;
            const scaledSize = baseSize * zoomLevel;

            return (
              <div
                key={key}
                style={{
                  position: 'absolute',
                  left: `${(node.x * zoomLevel) - (scaledSize / 2)}px`,
                  top: `${(node.y * zoomLevel) - (scaledSize / 2)}px`,
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  backgroundColor: isInPath ? '#4f46e5' : 'white',
                  border: `${Math.max(3 * zoomLevel, 1)}px solid ${isInPath ? '#1d4ed8' : '#374151'}`,
                  borderRadius: '50%',
                  zIndex: 100,
                  boxShadow: `0 ${4 * zoomLevel}px ${8 * zoomLevel}px rgba(0,0,0,0.25)`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                title={node.label}
              />
            );
          })}

          {/* Render Path Lines */}
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

            return (
              <div
                key={`path-${index}`}
                style={{
                  position: 'absolute',
                  left: `${prevNode.x * zoomLevel}px`,
                  top: `${(prevNode.y * zoomLevel) - (3 * zoomLevel)}px`,
                  width: `${length}px`,
                  height: `${6 * zoomLevel}px`,
                  background: 'linear-gradient(90deg, #ef4444, #dc2626)',
                  transformOrigin: '0 50%',
                  transform: `rotate(${angle}deg)`,
                  zIndex: 90,
                  boxShadow: `0 0 ${8 * zoomLevel}px rgba(239, 68, 68, 0.6)`,
                  borderRadius: `${3 * zoomLevel}px`
                }}
              />
            );
          })}

          {/* Current Position Indicator */}
          {isAnimating && animationStep < currentPath.length && (
            <div
              style={{
                position: 'absolute',
                left: `${(nodes[currentPath[animationStep]]?.x * zoomLevel) - (18 * zoomLevel)}px`,
                top: `${(nodes[currentPath[animationStep]]?.y * zoomLevel) - (18 * zoomLevel)}px`,
                width: `${36 * zoomLevel}px`,
                height: `${36 * zoomLevel}px`,
                background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                border: `${4 * zoomLevel}px solid white`,
                borderRadius: '50%',
                zIndex: 110,
                boxShadow: `0 ${6 * zoomLevel}px ${12 * zoomLevel}px rgba(0,0,0,0.4)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite'
              }}
            >
              <MapPin size={20 * zoomLevel} color="white" />
            </div>
          )}

          {/* Start and End Markers */}
          {currentPath.length > 0 && (
            <>
              {/* Start Marker */}
              <div
                style={{
                  position: 'absolute',
                  left: `${(nodes[currentPath[0]]?.x * zoomLevel) - (15 * zoomLevel)}px`,
                  top: `${(nodes[currentPath[0]]?.y * zoomLevel) - (15 * zoomLevel)}px`,
                  width: `${30 * zoomLevel}px`,
                  height: `${30 * zoomLevel}px`,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  border: `${3 * zoomLevel}px solid white`,
                  borderRadius: '50%',
                  zIndex: 105,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 ${4 * zoomLevel}px ${8 * zoomLevel}px rgba(0,0,0,0.3)`,
                  fontSize: `${16 * zoomLevel}px`,
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                S
              </div>

              {/* End Marker */}
              <div
                style={{
                  position: 'absolute',
                  left: `${(nodes[currentPath[currentPath.length - 1]]?.x * zoomLevel) - (15 * zoomLevel)}px`,
                  top: `${(nodes[currentPath[currentPath.length - 1]]?.y * zoomLevel) - (15 * zoomLevel)}px`,
                  width: `${30 * zoomLevel}px`,
                  height: `${30 * zoomLevel}px`,
                  background: 'linear-gradient(135deg, #9333ea, #7c3aed)',
                  border: `${3 * zoomLevel}px solid white`,
                  borderRadius: '50%',
                  zIndex: 105,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 ${4 * zoomLevel}px ${8 * zoomLevel}px rgba(0,0,0,0.3)`,
                  fontSize: `${16 * zoomLevel}px`,
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

      {/* Navigation Status */}
      {isAnimating && (
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <div>
              <div style={{
                fontSize: '1.5rem',
                color: '#15803d',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Currently at: {nodes[currentPath[animationStep]]?.label || 'Unknown'}
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#16a34a',
                fontWeight: '500'
              }}>
                Step {animationStep + 1} of {currentPath.length}
              </div>
            </div>
            <div style={{
              textAlign: 'right',
              fontSize: '1rem',
              color: '#15803d'
            }}>
              {currentPath.length > animationStep + 1 && (
                <div style={{ fontWeight: '500' }}>
                  Next: {nodes[currentPath[animationStep + 1]]?.label}
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #16a34a, #15803d)',
              borderRadius: '6px',
              transition: 'width 0.5s ease',
              width: `${((animationStep + 1) / currentPath.length) * 100}%`,
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
            }} />
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '1rem'
        }}>
          Navigation Instructions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          fontSize: '0.875rem',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          <div>
            <strong style={{ color: '#374151' }}>Map Controls:</strong>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '8px' }}>
              <li>Use zoom controls to scale the map view</li>
              <li>White dots are navigation waypoints</li>
              <li>Blue dots show your planned route</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Route Indicators:</strong>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '8px' }}>
              <li>Red lines connect route waypoints</li>
              <li>Green 'S' marks your starting point</li>
              <li>Purple 'E' marks the exit point</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default FindPath;