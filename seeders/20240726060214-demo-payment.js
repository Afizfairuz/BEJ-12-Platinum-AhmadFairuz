"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Payments",
      [
        {
          method: "Bank Debit",
          orderId: 1,
          createdAt: now,
          updatedAt: now,
        },
        {
          method: "QR Code",
          orderId: 2,
          createdAt: now,
          updatedAt: now,
        },
        {
          method: "E-wallet",
          orderId: 3,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
