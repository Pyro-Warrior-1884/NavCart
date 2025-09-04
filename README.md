# **NavCart**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
---

## **Description**

**NavCart** is an intelligent **smart-store navigation** and **shopping cart management** application built using **React**.  
It enhances the **in-store shopping experience** by combining:

- Dynamic product browsing.
- Interactive cart management.
- Optimized shopping path generation.
- Real-time visualization of store routes on a **store map**.

With **NavCart**, shoppers can **plan their shopping trips efficiently** and store owners can improve customer experience.

---

## **Features**

### **Product Management**
- Browse products across **40+ store sections**.
- Search items instantly with **live filtering**.
- Automatically validates stock before adding products to the cart.

### **Shopping Cart**
- Add or remove products seamlessly.
- Real-time cart section tracking.
- Displays **total items**, **sections covered**, and **stock availability**.

### **Intelligent Pathfinding**
- Implements **Dijkstra's algorithm** with **Greedy Nearest Neighbor** optimization.
- Generates the **shortest possible route** to collect items.
- Supports multiple entrances, checkouts, and exits.

### **Store Map Navigation**
- Interactive store map with:
  - **Zoom In / Zoom Out** controls.
  - **Pan & drag** navigation.
  - Dynamic section highlighting.
- Animated navigation along the computed shopping route.

### **Responsive Design**
- Fully responsive for **desktop**, **tablet**, and **mobile**.

---

## **Technologies Used**

### **Frontend**
- **React** (Hooks-based)
- **JavaScript (ES6+)**
- **Lucide-React** (modern icons)
- **HTML5 / CSS3**

### **Algorithms**
- **Dijkstra's Algorithm** → Computes shortest paths between sections.
- **Greedy Nearest Neighbor** → Optimizes visiting order for multiple items.
- Implemented in `pathfinding.js`.

---

