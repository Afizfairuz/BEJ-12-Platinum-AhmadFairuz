"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Laptop",
          description: "laptop high performance",
          price: 1200.0,
          stock: 10,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Smartphone",
          description: "model with advanced features",
          price: 800.0,
          stock: 20,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Headphones",
          description:
            "audio experience.",
          price: 150.0,
          stock: 30,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
