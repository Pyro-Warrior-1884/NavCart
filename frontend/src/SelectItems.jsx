import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Package, Milk, Apple, Coffee, Droplets, Zap } from 'lucide-react';

const SelectItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(new Set());

  // Sample supermarket inventory data
  const inventory = {
    "Fresh Produce": {
      icon: <Apple className="w-6 h-6" />,
      color: "#4f46e5",
      items: [
        { id: 1, name: "Bananas", price: 2.99, stock: 45, unit: "per bunch" },
        { id: 2, name: "Apples - Red Delicious", price: 3.49, stock: 32, unit: "per lb" },
        { id: 3, name: "Carrots", price: 1.99, stock: 28, unit: "per bag" },
        { id: 4, name: "Spinach - Fresh", price: 2.79, stock: 15, unit: "per bunch" },
        { id: 5, name: "Tomatoes - Cherry", price: 4.99, stock: 22, unit: "per container" },
        { id: 6, name: "Potatoes - Russet", price: 3.99, stock: 38, unit: "per 5lb bag" },
        { id: 7, name: "Bell Peppers", price: 2.49, stock: 19, unit: "each" },
        { id: 8, name: "Lettuce - Iceberg", price: 1.89, stock: 25, unit: "per head" }
      ]
    },
    "Dairy & Eggs": {
      icon: <Milk className="w-6 h-6" />,
      color: "#4f46e5",
      items: [
        { id: 9, name: "Milk - Whole 2%", price: 3.89, stock: 24, unit: "per gallon" },
        { id: 10, name: "Eggs - Large Grade A", price: 2.99, stock: 18, unit: "per dozen" },
        { id: 11, name: "Cheese - Cheddar", price: 4.49, stock: 12, unit: "per 8oz block" },
        { id: 12, name: "Yogurt - Greek Plain", price: 1.99, stock: 31, unit: "per container" },
        { id: 13, name: "Butter - Unsalted", price: 4.99, stock: 16, unit: "per stick pack" },
        { id: 14, name: "Cream Cheese", price: 2.49, stock: 22, unit: "per 8oz pack" }
      ]
    },
    "Bakery": {
      icon: <Coffee className="w-6 h-6" />,
      color: "#4f46e5",
      items: [
        { id: 15, name: "Whole Wheat Bread", price: 2.79, stock: 14, unit: "per loaf" },
        { id: 16, name: "Croissants - Fresh", price: 5.99, stock: 8, unit: "per 6-pack" },
        { id: 17, name: "Bagels - Everything", price: 3.99, stock: 12, unit: "per 6-pack" },
        { id: 18, name: "Sourdough Bread", price: 4.49, stock: 9, unit: "per loaf" },
        { id: 19, name: "Dinner Rolls", price: 2.99, stock: 20, unit: "per 8-pack" }
      ]
    },
    "Beverages": {
      icon: <Droplets className="w-6 h-6" />,
      color: "#4f46e5",
      items: [
        { id: 20, name: "Orange Juice - Fresh", price: 4.99, stock: 16, unit: "per 64oz" },
        { id: 21, name: "Coffee - Ground", price: 8.99, stock: 23, unit: "per 12oz bag" },
        { id: 22, name: "Soda - Cola", price: 1.99, stock: 48, unit: "per 2L bottle" },
        { id: 23, name: "Water - Spring", price: 3.49, stock: 35, unit: "per 24-pack" },
        { id: 24, name: "Tea - Green", price: 3.99, stock: 14, unit: "per box" },
        { id: 25, name: "Energy Drink", price: 2.49, stock: 27, unit: "each" }
      ]
    },
    "Frozen Foods": {
      icon: <Zap className="w-6 h-6" />,
      color: "#4f46e5",
      items: [
        { id: 26, name: "Frozen Pizza - Pepperoni", price: 6.99, stock: 18, unit: "each" },
        { id: 27, name: "Ice Cream - Vanilla", price: 4.99, stock: 12, unit: "per pint" },
        { id: 28, name: "Frozen Vegetables Mix", price: 2.99, stock: 25, unit: "per bag" },
        { id: 29, name: "Frozen Chicken Nuggets", price: 7.99, stock: 15, unit: "per bag" },
        { id: 30, name: "Frozen Berries", price: 5.49, stock: 20, unit: "per bag" }
      ]
    },
    "Pantry Essentials": {
      icon: <Package className="w-6 h-6" />,
      color: "#4f46e5",
      items: [
        { id: 31, name: "Rice - Jasmine", price: 4.99, stock: 22, unit: "per 5lb bag" },
        { id: 32, name: "Pasta - Spaghetti", price: 1.99, stock: 35, unit: "per box" },
        { id: 33, name: "Olive Oil - Extra Virgin", price: 8.99, stock: 14, unit: "per bottle" },
        { id: 34, name: "Canned Tomatoes", price: 1.49, stock: 42, unit: "per can" },
        { id: 35, name: "Flour - All Purpose", price: 3.49, stock: 18, unit: "per 5lb bag" },
        { id: 36, name: "Sugar - Granulated", price: 2.99, stock: 26, unit: "per 4lb bag" }
      ]
    }
  };

  // Search functionality with fuzzy matching
  const filteredInventory = useMemo(() => {
    if (!searchTerm.trim()) return inventory;

    const filtered = {};
    Object.entries(inventory).forEach(([section, data]) => {
      const matchingItems = data.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingItems.length > 0) {
        filtered[section] = { ...data, items: matchingItems };
      }
    });
    return filtered;
  }, [searchTerm]);

  const handleCartToggle = (itemId) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const totalItems = Object.values(inventory).reduce((total, section) => total + section.items.length, 0);
  const totalSections = Object.keys(inventory).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingCart style={{ color: '#4f46e5', width: '2rem', height: '2rem' }} />
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                NavCart
              </h1>
            </div>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              alignItems: 'center'
            }}>
              <span>{totalSections} Sections</span>
              <span>{totalItems} Items</span>
              <div style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ShoppingCart style={{ width: '1rem', height: '1rem' }} />
                {cartItems.size}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              width: '1.25rem',
              height: '1.25rem'
            }} />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '85%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                fontSize: '1rem',
                border: '2px solid transparent',
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #4f46e5';
                e.target.style.boxShadow = '0 6px 25px rgba(79, 70, 229, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid transparent';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {Object.keys(filteredInventory).length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <Search style={{ width: '4rem', height: '4rem', color: '#9ca3af', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#374151', margin: '0 0 0.5rem 0' }}>
              No items found
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Try searching for a different product name
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {Object.entries(filteredInventory).map(([sectionName, sectionData]) => (
              <div
                key={sectionName}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Section Header */}
                <div style={{
                  padding: '1.5rem 2rem',
                  background: `linear-gradient(135deg, ${sectionData.color}, ${sectionData.color}dd)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.5rem',
                    borderRadius: '0.5rem'
                  }}>
                    {sectionData.icon}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {sectionName}
                    </h2>
                    <p style={{
                      fontSize: '0.875rem',
                      opacity: 0.9,
                      margin: 0
                    }}>
                      {sectionData.items.length} items available
                    </p>
                  </div>
                </div>

                {/* Items Grid */}
                <div style={{
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {sectionData.items.map((item) => {
                    const isInCart = cartItems.has(item.id);
                    return (
                      <div
                        key={item.id}
                        style={{
                          background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.75rem',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc, #ffffff)';
                          e.currentTarget.style.borderColor = sectionData.color.replace('bg-', '').replace('-500', '');
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff, #f8fafc)';
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Stock indicator */}
                        <div style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          background: item.stock > 20 ? '#10b981' : item.stock > 10 ? '#f59e0b' : '#ef4444',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px'
                        }}>
                          {item.stock} in stock
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: '0 0 0.5rem 0',
                            lineHeight: '1.4'
                          }}>
                            {item.name}
                          </h3>
                          
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '0.75rem'
                          }}>
                            <div>
                              <div style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: '#059669'
                              }}>
                                ${item.price}
                              </div>
                              <div style={{
                                fontSize: '0.875rem',
                                color: '#6b7280'
                              }}>
                                {item.unit}
                              </div>
                            </div>
                            
                            <button
                              style={{
                                background: isInCart 
                                  ? 'linear-gradient(135deg, #10b981, #059669)' 
                                  : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = isInCart 
                                  ? '0 4px 15px rgba(16, 185, 129, 0.4)' 
                                  : '0 4px 15px rgba(79, 70, 229, 0.4)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                              }}
                              onClick={() => handleCartToggle(item.id)}
                            >
                              {isInCart ? 'Added ✓' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Stats */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: '0.875rem',
        color: '#374151'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
          Search Results
        </div>
        <div>
          {Object.keys(filteredInventory).length} sections • {' '}
          {Object.values(filteredInventory).reduce((total, section) => total + section.items.length, 0)} items
        </div>
      </div>
    </div>
  );
};

export default SelectItems;