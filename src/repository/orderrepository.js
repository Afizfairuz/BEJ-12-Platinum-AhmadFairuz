class OrderRepository {
    async create(order) {
        orders.push(order);
        return order;
    }

    async getAll() {
        return orders;
    }

    async update(id, updatedOrder) {
        const index = orders.findIndex(order => order.id === id);
        if (index !== -1) {
            orders[index] = { ...orders[index], ...updatedOrder };
            return orders[index];
        }
        return null;
    }

    async delete(id) {
        const index = orders.findIndex(order => order.id === id);
        if (index !== -1) {
            const [deletedOrder] = orders.splice(index, 1);
            return deletedOrder;
        }
        return null;
    }
}

module.exports = OrderRepository;
