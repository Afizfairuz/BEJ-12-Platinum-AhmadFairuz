const orderRepository = require('../repository/orderrepository');

class OrderService {
    async createOrder(order) {
        return await orderRepository.create(order);
    }

    async getAllOrders() {
        return await orderRepository.getAll();
    }

    async updateOrder(id, updatedOrder) {
        return await orderRepository.update(id, updatedOrder);
    }

    async deleteOrder(id) {
        return await orderRepository.delete(id);
    }
}

module.exports = OrderService;
