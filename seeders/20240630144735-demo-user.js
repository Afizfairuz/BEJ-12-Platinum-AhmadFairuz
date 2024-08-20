"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Afiz",
          email: "afiz@gmail.com",
          password: "afiz123",
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Budi",
          email: "budi@gmail.com",
          password: "budi123",
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "Siti",
          email: "siti@gmail.com",
          password: "siti123",
          createdAt: now,
          updatedAt: now,
        },
        {
          // digunakan untuk mendapatkan data user
          name: "admin",
          email: "admin@gmail.com",
          password: "admin123",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
