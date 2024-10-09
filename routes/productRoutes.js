const express = require('express');
const router = express.Router();
const Product = require('../config/models/Product'); 
const Order = require('../config/models/Order'); 

// Route untuk menampilkan produk
router.get('/', async (req, res) => {
  try {
    let products = await Product.findAll();
    res.render('beranda', { products, activePage: 'beranda' }); 
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Route untuk menampilkan form tambah produk
router.get('/add-product', (req, res) => {
  res.render('add-product', { activePage: 'add-product' }); 
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

// Membeli produk
router.post('/buy/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: 'Jumlah tidak valid' });
  }

  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    if (product.stok < quantity) {
      return res.status(400).json({ message: 'Stok tidak mencukupi' });
    }

    // Kurangi stok produk
    product.stok -= quantity;
    await product.save();

    // Simpan pesanan ke database
    await Order.create({
      product_id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
      description: product.description  
    });
    

    res.status(200).json({ message: 'Pembelian berhasil' });
  } catch (err) {
    console.error('Error buying product:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk menampilkan halaman pesanan
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll(); // Ambil data pesanan dari database
    res.render('orders', { orders, activePage: 'pesanan' });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send('Error fetching orders');
  }
});

// Beranda Route
router.get('/products', async (req, res) => {
  try {
    let products = await Product.findAll(); // Ambil data produk dari database
    res.render('index', { products, activePage: 'produk' }); // Kirim data produk ke beranda.ejs
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

module.exports = router;
