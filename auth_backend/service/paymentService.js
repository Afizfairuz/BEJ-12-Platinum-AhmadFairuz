const PaymentRepository = require("../repository/paymentRepository");

class PaymentService {
  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  async getAllPayments() {
    return await this.paymentRepository.getAllPayments();
  }

  async getPaymentById(id) {
    return await this.paymentRepository.getPaymentById(id);
  }

  async createPayment(paymentData) {
    return await this.paymentRepository.createPayment(paymentData);
  }

  async updatePayment(id, paymentData) {
    return await this.paymentRepository.updatePayment(id, paymentData);
  }

  async deletePayment(id) {
    return await this.paymentRepository.deletePayment(id);
  }
}

module.exports = PaymentService;
