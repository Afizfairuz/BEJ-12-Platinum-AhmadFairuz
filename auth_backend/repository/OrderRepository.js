const Order = require("../../models/order");

class OrderRepository {
  async getAllOrders() {
    return await Order.findAll();
  }

  async getOrderById(id) {
    return await Order.findByPk(id);
  }

  async createOrder(orderData) {
    return await Order.create(orderData);
  }

  async updateOrder(id, orderData) {
    const order = await Order.findByPk(id);
    if (order) {
      return await order.update(orderData);
    }
    return null;
  }

  async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      return true;
    }
    return false;
  }
}

module.exports = OrderRepository;
