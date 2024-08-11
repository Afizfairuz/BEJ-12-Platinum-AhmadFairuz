const Payment = require("../../models/payment");

class PaymentRepository {
  async getAllPayments() {
    return await Payment.findAll();
  }

  async getPaymentById(id) {
    return await Payment.findByPk(id);
  }

  async createPayment(paymentData) {
    return await Payment.create(paymentData);
  }

  async updatePayment(id, paymentData) {
    const payment = await Payment.findByPk(id);
    if (payment) {
      return await payment.update(paymentData);
    }
    return null;
  }

  async deletePayment(id) {
    const payment = await Payment.findByPk(id);
    if (payment) {
      await payment.destroy();
      return true;
    }
    return false;
  }
}

module.exports = PaymentRepository;
