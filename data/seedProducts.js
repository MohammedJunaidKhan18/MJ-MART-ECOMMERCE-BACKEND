const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const sampleProducts = [
  { name: 'Laptop', price: 799, description: 'Gaming laptop', stock: 20 },
  { name: 'Phone', price: 499, description: 'Smartphone', stock: 30 },
  { name: 'Headphones', price: 99, description: 'Noise cancelling', stock: 50 },
  { name: 'Keyboard', price: 49, description: 'Mechanical keyboard', stock: 40 },
  { name: 'Monitor', price: 199, description: '4K Monitor', stock: 25 },
  { name: 'Mouse', price: 29, description: 'Wireless mouse', stock: 60 },
  { name: 'Tablet', price: 299, description: 'Android tablet', stock: 35 },
  { name: 'Smartwatch', price: 149, description: 'Fitness tracker', stock: 45 },
  { name: 'Camera', price: 599, description: 'DSLR camera', stock: 15 },
  { name: 'Speaker', price: 89, description: 'Bluetooth speaker', stock: 55 },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('Database seeded');
  mongoose.disconnect();
};

seedDB();
