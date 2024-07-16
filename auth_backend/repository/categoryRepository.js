const Category = require("../../models/category");

class CategoryRepository {
  async getAllCategories() {
    return await Category.findAll();
  }

  async getCategoryById(id) {
    return await Category.findByPk(id);
  }

  async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  async updateCategory(id, categoryData) {
    const category = await Category.findByPk(id);
    if (category) {
      return await category.update(categoryData);
    }
    return null;
  }

  async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  }
}

module.exports = CategoryRepository;
