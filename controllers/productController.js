const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().limit(10);
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};
