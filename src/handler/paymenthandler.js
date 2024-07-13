const PaymentService = require('../service/paymentservice');

class PaymentHandler {
    constructor() {
        this.paymentService = new PaymentService();
    }

    async getAllPayments(req, res) {
        try {
            const payments = await this.paymentService.getAllPayments();
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getPaymentById(req, res) {
        const paymentId = req.params.paymentId;
        try {
            const payment = await this.paymentService.getPaymentById(paymentId);
            if (payment) {
                res.status(200).json(payment);
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createPayment(req, res) {
        const paymentData = req.body;
        try {
            const newPayment = await this.paymentService.createPayment(paymentData);
            res.status(201).json(newPayment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updatePayment(req, res) {
        const paymentId = req.params.paymentId;
        const updateData = req.body;
        try {
            const updatedPayment = await this.paymentService.updatePayment(paymentId, updateData);
            if (updatedPayment) {
                res.status(200).json(updatedPayment);
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deletePayment(req, res) {
        const paymentId = req.params.paymentId;
        try {
            const result = await this.paymentService.deletePayment(paymentId);
            if (result) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PaymentHandler;
