const Product = require("../../models/product");

class ProductRepository {
  constructor() {
    this.Product = Product;
  }

  async findAll() {
    try {
      const productList = await this.Product.findAll();
      return productList;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async createProduct(productData) {
    try {
      const newProduct = await this.Product.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.Product.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  async updateProduct(id, name, description, price) {
    try {
      const updatedProduct = await this.Product.update(
        { name, description, price },
        {
          where: { id },
          returning: true,
        }
      );
      return updatedProduct[1][0];
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await this.Product.destroy({ where: { id } });
      return deletedProduct;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}

module.exports = ProductRepository;
