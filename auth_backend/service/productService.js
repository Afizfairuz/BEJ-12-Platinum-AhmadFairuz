const ProductRepository = require("../repository/productRepository");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    return await this.productRepository.findAll();
  }

  async createProduct(product) {
    return await this.productRepository.createProduct(product);
  }

  async getProductById(id) {
    return await this.productRepository.getProductById(id);
  }

  async updateProduct(id, name, description, price) {
    return await this.productRepository.updateProduct(
      id,
      name,
      description,
      price
    );
  }

  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id);
  }
}

module.exports = ProductService;
