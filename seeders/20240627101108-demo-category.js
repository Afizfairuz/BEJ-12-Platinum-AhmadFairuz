"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Electronics",
          description: "Category for electronic",
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "baju",
          description: "kategori baju",
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "buku",
          description: "materi buku ",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
