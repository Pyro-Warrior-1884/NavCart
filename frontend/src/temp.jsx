import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, X } from 'lucide-react';
import FindPath from './FindPath';

const SelectItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(new Set());
  const [showCart, setShowCart] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);
  const [cartSections, setCartSections] = useState(new Set()); 
  const [showFindPath, setShowFindPath] = useState(false);

  const sectionMapping = {
    "Dairy": "dairy_top",
    "Baby Section": "baby_junction",
    "Shoes": "baby_shoes",
    "Electronics": "electronics",
    "Books": "books_junction",
    "Toys": "toys"
  };

  const inventory = {
    "Dairy": {
      items: [
        { id: 1, name: "Organic Whole Milk", price: 4.99, stock: 10, unit: "per gallon" },
        { id: 2, name: "Free Range Eggs", price: 3.49, stock: 42, unit: "per dozen" },
        { id: 3, name: "Sharp Cheddar Cheese", price: 5.99, stock: 28, unit: "per 12oz block" },
        { id: 4, name: "Greek Yogurt - Vanilla", price: 1.79, stock: 56, unit: "per 6oz cup" },
        { id: 5, name: "Unsalted Butter", price: 4.29, stock: 33, unit: "per 1lb pack" }
      ]
    },
    "Baby Section": {
      items: [
        { id: 6, name: "Baby Formula - Stage 1", price: 28.99, stock: 18, unit: "per 12.4oz can" },
        { id: 7, name: "Newborn Diapers", price: 24.99, stock: 25, unit: "per 84-count pack" },
        { id: 8, name: "Baby Wipes - Sensitive", price: 4.99, stock: 67, unit: "per 80-count pack" },
        { id: 9, name: "Baby Food - Mixed Vegetables", price: 1.29, stock: 89, unit: "per 4oz jar" },
        { id: 10, name: "Pacifiers - Silicone", price: 8.99, stock: 34, unit: "per 2-pack" }
      ]
    },
    "Shoes": {
      items: [
        { id: 11, name: "Running Shoes - Women's", price: 89.99, stock: 12, unit: "per pair" },
        { id: 12, name: "Kids Sneakers", price: 34.99, stock: 28, unit: "per pair" },
        { id: 13, name: "Men's Work Boots", price: 124.99, stock: 8, unit: "per pair" },
        { id: 14, name: "Sandals - Casual", price: 19.99, stock: 45, unit: "per pair" },
        { id: 15, name: "House Slippers", price: 12.99, stock: 36, unit: "per pair" }
      ]
    },
    "Electronics": {
      items: [
        { id: 16, name: "Wireless Earbuds", price: 49.99, stock: 15, unit: "per pair" },
        { id: 17, name: "Phone Charger Cable", price: 14.99, stock: 78, unit: "each" },
        { id: 18, name: "Bluetooth Speaker", price: 79.99, stock: 9, unit: "each" },
        { id: 19, name: "Power Bank", price: 29.99, stock: 22, unit: "each" },
        { id: 20, name: "Screen Protector", price: 9.99, stock: 54, unit: "per 2-pack" }
      ]
    },
    "Books": {
      items: [
        { id: 21, name: "Mystery Novel - Bestseller", price: 14.99, stock: 23, unit: "each" },
        { id: 22, name: "Children's Picture Book", price: 8.99, stock: 45, unit: "each" },
        { id: 23, name: "Cookbook - Italian Cuisine", price: 19.99, stock: 16, unit: "each" },
        { id: 24, name: "Self-Help Guide", price: 16.99, stock: 31, unit: "each" },
        { id: 25, name: "Magazine - Home & Garden", price: 4.99, stock: 67, unit: "each" }
      ]
    },
    "Toys": {
      items: [
        { id: 26, name: "LEGO Building Set", price: 39.99, stock: 14, unit: "each" },
        { id: 27, name: "Stuffed Animal - Teddy Bear", price: 12.99, stock: 38, unit: "each" },
        { id: 28, name: "Puzzle - 1000 pieces", price: 18.99, stock: 22, unit: "each" },
        { id: 29, name: "Action Figure", price: 24.99, stock: 29, unit: "each" },
        { id: 30, name: "Board Game - Family", price: 29.99, stock: 17, unit: "each" }
      ]
    }
  };

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

  if (showFindPath) {
    return (
      <FindPath
        selectedSections={[...cartSections]}
        onBackToItems={() => setShowFindPath(false)}
      />
    );
  }

  const handleConfirmAndGenerate = () => {
    if (cartSections.size === 0) {
      alert("⚠ Please select at least one item before generating a path!");
      return;
    }
    setShowFindPath(true); 
  };

  const findItemSection = (itemId) => {
    for (const [sectionName, sectionData] of Object.entries(inventory)) {
      const item = sectionData.items.find(item => item.id === itemId);
      if (item) {
        return sectionName;
      }
    }
    return null;
  };

  const updateCartSections = (newCartItems) => {
    const newSections = new Set();
    
    newCartItems.forEach(itemId => {
      const sectionName = findItemSection(itemId);
      if (sectionName && sectionMapping[sectionName]) {
        newSections.add(sectionMapping[sectionName]);
      }
    });
    
    setCartSections(newSections);
    console.log('Cart sections updated:', Array.from(newSections));
  };

  const handleCartToggle = (itemId) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      
      updateCartSections(newSet);      
      return newSet;
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      updateCartSections(newSet);      
      return newSet;
    });
  };

  const totalItems = Object.values(inventory).reduce((total, section) => total + section.items.length, 0);
  const totalSections = Object.keys(inventory).length;

  const cartItemDetails = [];
  cartItems.forEach(id => {
    for (const section of Object.values(inventory)) {
      const item = section.items.find(i => i.id === id);
      if (item) {
        cartItemDetails.push(item);
        break;
      }
    }
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
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
            <div 
              style={{
                display: 'flex',
                gap: '1.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                alignItems: 'center'
              }}
            >
              <span>{totalSections} Sections</span>
              <span>{totalItems} Items</span>
              <button
                onClick={() => setShowPathModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  opacity: cartItems.size === 0 ? 0.5 : 1,
                  pointerEvents: cartItems.size === 0 ? 'none' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (cartItems.size > 0) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={cartItems.size === 0}
              >
                Find Store Path
              </button>
              <div 
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  userSelect: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setShowCart(true)}
                title="View cart"
                aria-label="View cart items"
              >
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
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
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
                          e.currentTarget.style.borderColor = '#4f46e5';
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

      {/* Path Modal */}
      {showPathModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="path-title"
          tabIndex={-1}
          onClick={() => setShowPathModal(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
            backdropFilter: 'blur(5px)'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              width: '500px',
              maxHeight: '80vh',
              overflowY: 'auto',
              borderRadius: '1rem',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid #e5e7eb',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              borderRadius: '1rem 1rem 0 0'
            }}>
              <h2 id="path-title" style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>
                Store Path Planning
              </h2>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.875rem' }}>
                Review your cart items before generating optimal store path
              </p>
            </div>

            {cartItems.size === 0 ? (
              <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#6b7280' }}>
                <ShoppingCart style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: '#374151' }}>Your Cart is Empty</h3>
                <p style={{ margin: 0 }}>Add items to your cart to generate a store path</p>
              </div>
            ) : (
              <>
                <div style={{ padding: '1.5rem 2rem', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 1rem 0', color: '#374151' }}>
                    Cart Summary ({cartItems.size} items)
                  </h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {cartItemDetails.map((item, index) => (
                      <li key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 0',
                        borderBottom: index < cartItemDetails.length - 1 ? '1px solid #f3f4f6' : 'none'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', color: '#111827', fontSize: '1rem' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                            {item.unit}
                          </div>
                        </div>
                        <div style={{ fontWeight: '700', color: '#059669', fontSize: '1.125rem' }}>
                          ${item.price.toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  padding: '1.5rem 2rem',
                  borderTop: '2px solid #e5e7eb',
                  background: '#f9fafb'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                      Total Amount:
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                      ${cartItemDetails.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setShowPathModal(false)}
                      style={{
                        background: 'transparent',
                        border: '2px solid #d1d5db',
                        color: '#6b7280',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#9ca3af';
                        e.target.style.color = '#374151';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.color = '#6b7280';
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmAndGenerate}
                      style={{
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        border: 'none',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Confirm & Generate Path
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="cart-title"
          tabIndex={-1}
          onClick={() => setShowCart(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 1200,
            backdropFilter: 'blur(5px)'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              width: '360px',
              maxHeight: '100vh',
              overflowY: 'auto',
              borderRadius: '1rem 0 0 1rem',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white',
              borderRadius: '1rem 0 0 0'
            }}>
              <h2 id="cart-title" style={{ margin: 0, fontWeight: 700, fontSize: '1.25rem' }}>
                Your Cart ({cartItems.size})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {cartItems.size === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                Your Cart is Empty
              </div>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: '1rem 1.25rem', flexGrow: 1 }}>
                {cartItemDetails.map(item => (
                  <li key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#111827' }}>{item.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        ${item.price.toFixed(2)} - {item.unit}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      style={{
                        background: '#ef4444',
                        border: 'none',
                        color: 'white',
                        borderRadius: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#dc2626'}
                      onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cartItems.size > 0 && (
              <div style={{
                padding: '1rem 1.25rem',
                borderTop: '1px solid #e5e7eb',
                fontWeight: '700',
                fontSize: '1rem',
                color: '#111827'
              }}>
                Total: ${cartItemDetails.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectItems;