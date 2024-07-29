const ProductService = require("../service/productService");

class ProductHandler {
  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, description, price } = req.body;
      const newProduct = await this.productService.createProduct({
        name,
        description,
        price,
      });
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
      const updatedProduct = await this.productService.updateProduct(
        id,
        name,
        description,
        price
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await this.productService.deleteProduct(id);
      if (deletedProduct) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ProductHandler;
