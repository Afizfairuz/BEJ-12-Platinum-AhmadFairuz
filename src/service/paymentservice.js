const PaymentRepository = require('../repository/paymentrepository');

class PaymentService {
    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async getAllPayments() {
        return await this.paymentRepository.getAll();
    }

    async getPaymentById(paymentId) {
        return await this.paymentRepository.getById(paymentId);
    }

    async createPayment(paymentData) {
        return await this.paymentRepository.create(paymentData);
    }

    async updatePayment(paymentId, updateData) {
        return await this.paymentRepository.update(paymentId, updateData);
    }

    async deletePayment(paymentId) {
        return await this.paymentRepository.delete(paymentId);
    }
}

module.exports = PaymentService;
