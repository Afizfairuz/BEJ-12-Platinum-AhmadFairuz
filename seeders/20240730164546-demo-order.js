"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          userId: 1,
          productId: 1,
          quantity: 2,
          totalPrice: 200.0,
          createdAt: now,
          updatedAt: now,
        },
        {
          userId: 2,
          productId: 2,
          quantity: 1,
          totalPrice: 150.0,
          createdAt: now,
          updatedAt: now,
        },
        {
          userId: 3,
          productId: 3,
          quantity: 3,
          totalPrice: 600.0,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
