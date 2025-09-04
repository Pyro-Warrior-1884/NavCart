# **NavCart**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/NavCart/graphs/commit-activity)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/NavCart/pulls)
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)
[![Algorithm](https://img.shields.io/badge/Algorithm-Dijkstra-orange)](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
[![Lucide React](https://img.shields.io/badge/UI-Lucide--React-purple)](https://lucide.dev/)

---

## **📌 Description**

**NavCart** is an intelligent **smart-store navigation** and **shopping cart management** application built using **React**.  
It enhances the **in-store shopping experience** by combining:

- Dynamic product browsing.
- Interactive cart management.
- Optimized shopping path generation.
- Real-time visualization of store routes on a **store map**.

With **NavCart**, shoppers can **plan their shopping trips efficiently** and store owners can improve customer experience.

---

## **✨ Features**

### 🛍️ **Product Management**
- Browse products across **40+ store sections**.
- Search items instantly with **live filtering**.
- Automatically validates stock before adding products to the cart.

### 🛒 **Shopping Cart**
- Add or remove products seamlessly.
- Real-time cart section tracking.
- Displays **total items**, **sections covered**, and **stock availability**.

### 🗺️ **Intelligent Pathfinding**
- Implements **Dijkstra's algorithm** with **Greedy Nearest Neighbor** optimization.
- Generates the **shortest possible route** to collect items.
- Supports multiple entrances, checkouts, and exits.

### 🧭 **Store Map Navigation**
- Interactive store map with:
  - **Zoom In / Zoom Out** controls.
  - **Pan & drag** navigation.
  - Dynamic section highlighting.
- Animated navigation along the computed shopping route.

### 📱 **Responsive Design**
- Fully responsive for **desktop**, **tablet**, and **mobile**.

---

## **🛠️ Technologies Used**

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

## Directory Structure

> Briefly explain the purpose of each key directory and file. For example: "The `src/components` directory contains reusable UI components used throughout the application."

## Contributing

> Explain how others can contribute to your project. Be specific about the process.

We welcome contributions to NavCart!

bash
    git checkout -b feature/[>Your Feature Name<]
    > Add any specific contributing guidelines, such as coding style or testing requirements. For example:

*   Follow the [>Coding Style Guide, e.g., Airbnb JavaScript Style Guide<].
*   Write unit tests for any new features or bug fixes.
*   Ensure that all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

> Add your contact information or a link to your website/portfolio.

