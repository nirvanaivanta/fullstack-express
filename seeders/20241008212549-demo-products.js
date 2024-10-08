module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Smartphone XYZ',
        price: 5000000,
        description: 'Smartphone canggih dengan kamera 48MP',
        image: '/images/hp.jpg',
        stok: 10, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Laptop ABC',
        price: 1500000,
        description: 'Laptop wireless dengan suara jernih',
        image: '/images/laptop.jpg',
        stok: 5, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
