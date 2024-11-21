// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors()); // Enable CORS for requests from the frontend
app.use(express.json()); // To parse JSON in requests

// MongoDB Connection String (ensure this is correctly configured)
const dbURI = 'mongodb+srv://iamthulasinath:XNVMxw1qdgCAj3g7@cluster0.abpfq.mongodb.net/itemsArray?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to itemsArray'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  isAvailable: Boolean,
}, { collection: 'item' });  // Explicitly link to 'item' collection

// Create Mongoose Model for Items
const Item = mongoose.model('item', itemSchema);

// Define Order Schema (explicitly use 'orders' collection)
const orderSchema = new mongoose.Schema({
  customerDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    msg: { type: String },
  },
  cartItems: [
    {
      _id: String,
      name: String,
      price: Number,
      category: String,
      image: String,
      isAvailable: Boolean,
      quantity: { type: Number, required: true },
    },
  ],
}, { collection: 'orders' });  // Specify collection as 'orders'

// Create Mongoose Model for Orders
const Order = mongoose.model('Order', orderSchema);

// Route to fetch items from the 'item' collection
app.get('/getItem', async (req, res) => {
  try {
    const items = await Item.find();  // Query the 'item' collection
    res.status(200).json(items);  // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Route to save orders to the 'orders' collection
app.post('/orders', async (req, res) => {
  const { customerDetails, cartItems } = req.body;
  
  // Check if required fields are present
  if (!customerDetails || !customerDetails.name || !customerDetails.phone || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Customer details and cart items are required' });
  }

  try {
    // Create new order instance
    const newOrder = new Order({
      customerDetails,
      cartItems,
    });
    
    // Save order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
