const OrderRepository = require("../repository/OrderRepository");

class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders() {
    try {
      return await this.orderRepository.getAllOrders();
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async getOrderById(id) {
    try {
      return await this.orderRepository.getOrderById(id);
    } catch (error) {
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  }

  async createOrder(orderData) {
    try {
      return await this.orderRepository.createOrder(orderData);
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async updateOrder(id, orderData) {
    try {
      return await this.orderRepository.updateOrder(id, orderData);
    } catch (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  async deleteOrder(id) {
    try {
      return await this.orderRepository.deleteOrder(id);
    } catch (error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  }
}

module.exports = OrderService;
