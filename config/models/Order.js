const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Order = sequelize.define('orders', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  
}, {
  timestamps: true, 
});

module.exports = Order;
