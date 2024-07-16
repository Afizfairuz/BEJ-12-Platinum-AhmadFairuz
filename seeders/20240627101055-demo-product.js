"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "timnas",
          description: "jersey timnas",
          price: 100.0,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "bola",
          description: "bola nike",
          price: 150.0,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "iphone",
          description: "hp iphone 15",
          price: 200.0,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
