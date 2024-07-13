const orderService = require('../service/orderservice');

class OrderHandler {
    async createOrder(req, res) {
        try {
            const orderData = req.body;
            const newOrder = await orderService.createOrder(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create order', error: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get orders', error: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedOrder = await orderService.updateOrder(id, updateData);
            if (updatedOrder) {
                res.status(200).json(updatedOrder);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to update order', error: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const id = req.params.id;
            const deletedOrder = await orderService.deleteOrder(id);
            if (deletedOrder) {
                res.status(200).json({ message: 'Order deleted successfully' });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete order', error: error.message });
        }
    }
}

module.exports = OrderHandler;
