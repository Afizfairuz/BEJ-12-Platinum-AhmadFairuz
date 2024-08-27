const PaymentRepository = require("../paymentRepository");

// Mengganti Item dengan mock Item
jest.mock("../../../models/payment");

// Import Item setelah mendefinisikan mock
const PaymentModel = require("../../../models/payment");

describe("PaymentRepository", () => {
  let paymentRepository;

  beforeEach(() => {
    paymentRepository = new PaymentRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPayments", () => {
    it("should return a list of payments from getAllPayments", async () => {
      const mockPayments = [
        {
          id: 1,
          method: "Bank Debit",
          orderId: 1,
        },
        {
          id: 2,
          method: "QR Code",
          orderId: 2,
        },
      ];
      PaymentModel.findAll.mockResolvedValue(mockPayments);

      const payments = await paymentRepository.getAllPayments();
      expect(payments).toEqual(mockPayments);
      expect(PaymentModel.findAll).toHaveBeenCalled();
    });
  });

  describe("getPaymentById", () => {
    it("should return an item by id from getPaymentById", async () => {
      const mockPayment = { id: 1, method: "Bank Debit", orderId: 1 };
      PaymentModel.findByPk.mockResolvedValue(mockPayment);

      const payment = await paymentRepository.getPaymentById(1);
      expect(payment).toEqual(mockPayment);
      expect(PaymentModel.findByPk).toHaveBeenCalledWith(1);
    });

    it("should return null if payment is not found", async () => {
      PaymentModel.findByPk.mockResolvedValue(null);

      const payment = await paymentRepository.getPaymentById(1);
      expect(PaymentModel.findByPk).toHaveBeenCalledWith(1);
      expect(payment).toBeNull();
    });
  });

  describe("createPayment", () => {
    it("should create a new payment from createPayment", async () => {
      const newPayment = { method: "Cash on Delivery", orderId: 1 };
      const createdPayment = { id: 1, ...newPayment };
      PaymentModel.create.mockResolvedValue(createdPayment);

      const payment = await paymentRepository.createPayment(newPayment);
      expect(payment).toEqual(createdPayment);
      expect(PaymentModel.create).toHaveBeenCalledWith(newPayment);
    });
  });

  describe("updatePayment", () => {
    it("should update the payment if found", async () => {
      const mockPayment = {
        id: 1,
        method: "Bank Debit",
        orderId: 1,
        update: jest.fn().mockResolvedValue(true),
      };
      const mockPaymentData = { method: "Updated Payment" };
      PaymentModel.findByPk.mockResolvedValue(mockPayment);

      const updatedPayment = await paymentRepository.updatePayment(
        1,
        mockPaymentData
      );

      expect(PaymentModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockPayment.update).toHaveBeenCalledWith(mockPaymentData);
      expect(updatedPayment).toEqual(true);
    });

    it("should return null if payment is not found", async () => {
      PaymentModel.findByPk.mockResolvedValue(null);

      const updatedPayment = await paymentRepository.updatePayment(1, {
        name: "Updated Payment",
      });

      expect(PaymentModel.findByPk).toHaveBeenCalledWith(1);
      expect(updatedPayment).toBeNuPayment;
    });
  });

  describe("deletePayment", () => {
    it("should delete the payment if found", async () => {
      const mockPayment = { id: 1, destroy: jest.fn().mockResolvedValue(true) };
      PaymentModel.findByPk.mockResolvedValue(mockPayment);

      const result = await paymentRepository.deletePayment(1);

      expect(PaymentModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockPayment.destroy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("should return false if payment is not found", async () => {
      PaymentModel.findByPk.mockResolvedValue(null);

      const result = await paymentRepository.deletePayment(1);

      expect(PaymentModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBe(false);
    });
  });
});
