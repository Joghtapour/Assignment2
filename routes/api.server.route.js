const express = require('express');
const router = express.Router();

// Requires the database to initialize it
require("../environment/database")

// Imports the schema from the models folder
const Product = require('../models/product.server.model');

// GET all Products
router.get('/products', async (req, res) => {
  try {
    // This gets all the elements since it doesn't specify the scope.
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Product by id
router.get('/products/:id', async (req, res) => {
  try {
    // Finds the product by passing the parameter
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new Product
router.post('/products', async (req, res) => {
  // This adds/saves a new products from the body of the request
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update Product by id
router.put('/products/:id', async (req, res) => {
  try {
    // Updates the product acording to the ID, otherwise add the product as new
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE remove Product by id
router.delete('/products/:id', async (req, res) => {
  try {
    // Deletes the product acording the the parameter id
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remove all Products
router.delete('/products', async (req, res) => {
  try {
    // Removes all the products since doesn't specify the scope
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET find all Products which name contains 'kw'
router.get('/products', async (req, res) => {
  try {
    // Getting the name from the query '?name=' and using regex case insensitive and getting all the products that meets
    const { name } = req.query;
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;