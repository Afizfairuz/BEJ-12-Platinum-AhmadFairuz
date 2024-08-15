const CategoryRepository = require("../repository/categoryRepository");

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async getCategoryById(id) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async createCategory(categoryData) {
    return await this.categoryRepository.createCategory(categoryData);
  }

  async updateCategory(id, categoryData) {
    return await this.categoryRepository.updateCategory(id, categoryData);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.deleteCategory(id);
  }
}

module.exports = CategoryService;
