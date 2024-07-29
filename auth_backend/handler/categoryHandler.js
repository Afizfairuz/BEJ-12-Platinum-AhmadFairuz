const CategoryService = require("../service/categoryService");

class CategoryHandler {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAll(req, res) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const category = await this.categoryService.getCategoryById(
        req.params.id
      );
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newCategory = await this.categoryService.createCategory(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const deleted = await this.categoryService.deleteCategory(req.params.id);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CategoryHandler;
