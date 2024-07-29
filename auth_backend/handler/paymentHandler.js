const PaymentService = require("../service/paymentService");

class PaymentHandler {
  constructor() {
    this.paymentService = new PaymentService();
  }

  async getAll(req, res) {
    try {
      const payments = await this.paymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const payment = await this.paymentService.getPaymentById(req.params.id);
      if (payment) {
        res.status(200).json(payment);
      } else {
        res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newPayment = await this.paymentService.createPayment(req.body);
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const updatedPayment = await this.paymentService.updatePayment(
        req.params.id,
        req.body
      );
      if (updatedPayment) {
        res.status(200).json(updatedPayment);
      } else {
        res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const deleted = await this.paymentService.deletePayment(req.params.id);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentHandler;
