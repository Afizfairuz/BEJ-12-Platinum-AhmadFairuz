class PaymentRepository {
    constructor() {
        this.payments = []; 
    }

    async getAll() {
        return this.payments;
    }

    async getById(paymentId) {
        return this.payments.find(payment => payment.id === paymentId);
    }

    async create(paymentData) {
        this.payments.push(paymentData);
        return paymentData;
    }

    async update(paymentId, updateData) {
        const payment = await this.getById(paymentId);
        if (payment) {
            Object.assign(payment, updateData);
            return payment;
        }
        return null;
    }

    async delete(paymentId) {
        const index = this.payments.findIndex(payment => payment.id === paymentId);
        if (index !== -1) {
            this.payments.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = PaymentRepository;
