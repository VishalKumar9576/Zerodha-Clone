require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const User = require('./model/UserModel');

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use(bodyParser.json());

app.get("/addHoldings", async (req, res) => {
  let tempHoldings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];

  tempHoldings.forEach((item) => {
    let newHolding = new HoldingsModel({
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.day,
      day: item.day,
    });

    newHolding.save();
  });
  res.send("Done addHoldings data!");
});

app.get("/addPositions", async (req, res) => {
  let tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

  tempPositions.forEach((item) => {
    let newPosition = new PositionsModel({
      product: item.product,
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
      isLoss: item.isLoss,
    });

    newPosition.save();
  });
  res.send("Done!");
});

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

app.post('/signup', async (req, res) => {
    try {
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            console.error('MongoDB not connected. ReadyState:', mongoose.connection.readyState);
            return res.status(503).json({ error: 'Database connection not available. Please try again later.' });
        }

        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        
        // Check if email is valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }
        
        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }
        
        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered.' });
        }
        
        // Create new user
        const user = new User({ 
            email: email.toLowerCase().trim(), 
            password 
        });
        
        await user.save();
        
        // Generate JWT token
        const token = jwt.sign({ 
            id: user._id, 
            email: user.email 
        }, JWT_SECRET, { expiresIn: '1d' });
        
        console.log('User created successfully:', user.email);
        res.json({ 
            token, 
            message: 'Signup successful',
            user: { email: user.email }
        });
    } catch (err) {
        console.error('Signup error:', err);
        console.error('Error name:', err.name);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        
        // Handle duplicate key error (MongoDB)
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Email already registered.' });
        }
        
        // Handle validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        
        // Handle bcrypt errors
        if (err.message && err.message.includes('bcrypt')) {
            console.error('Bcrypt error - dependencies may not be installed');
            return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
        }
        
        // Generic error
        res.status(500).json({ 
            error: 'Signup failed. Please try again.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});

app.listen(PORT, () => {
  console.log(`Backend server started on port ${PORT}!`);
  mongoose.connect(uri)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
});

