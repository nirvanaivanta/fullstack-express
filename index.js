const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// Sinkronisasi dengan database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Gunakan rute produk
app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
