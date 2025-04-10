const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(item => item.productId.toString() === req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

exports.deleteCartItem = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id);
  await cart.save();
  res.json(cart);
};
