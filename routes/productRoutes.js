const express = require('express');
const router = express.Router();
const Product = require('../config/models/Product');

// Route untuk menampilkan produk
router.get('/', async (req, res) => {
  try {
    let products = await Product.findAll();
    res.render('index', { products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Route untuk menampilkan form tambah produk
router.get('/add-product', (req, res) => {
  res.render('add-product');
});

// Route untuk menangani penambahan produk
router.post('/add-product', async (req, res) => {
    const { name, price, description, image } = req.body;
    
    try {
        // Membuat produk baru dengan data dari form
        await Product.create({ name, price, description, image });
        // Redirect ke halaman utama setelah produk berhasil ditambahkan
        res.redirect('/');
    } catch (err) {
        console.error('Error adding product:', err.message); // Log pesan kesalahan
        res.status(500).send('Error adding product: ' + err.message); // Kirim pesan kesalahan
    }
});

  

module.exports = router;
