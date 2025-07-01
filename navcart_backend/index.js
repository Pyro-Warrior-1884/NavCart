// Importing packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Creating an express instance
const app = express();
app.use(express.json());

// Port configuration
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// MongoDB connection
const mongoURL = process.env.connectionString;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to the database..."))
.catch((err) => console.log("Connection Error:", err));

// Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


// Signup Route (Create)
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route (Read)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.status(200).json({
      message: "Login successful.",
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
