const express = require('express');
const sequelize = require('./config/database');
const Product = require('./config/models/Product');

const app = express(); 
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// Sinkronisasi dengan database
sequelize.sync() 
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Route utama untuk menampilkan barang
app.get('/', async (req, res) => {
  try {
    let products = await Product.findAll(); 

   
    if (products.length === 0) {
      await Product.bulkCreate([
        { name: 'Laptop Gaming', price: 15000000, description: 'Laptop gaming dengan performa tinggi', image: '/images/laptop.jpg' },
        { name: 'Smartphone', price: 3000000, description: 'Smartphone terbaru dengan kamera canggih', image: '/images/smartphone.jpg' },
        { name: 'Headphone', price: 500000, description: 'Headphone dengan kualitas suara jernih', image: '/images/headphone.jpg' }
      ]);
      
      products = await Product.findAll();
    }

   
    res.render('index', { products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
