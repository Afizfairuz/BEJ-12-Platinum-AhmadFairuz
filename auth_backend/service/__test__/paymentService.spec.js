const PaymentService = require("../paymentService");
const PaymentRepository = require("../../repository/paymentRepository");

// Mocking the PaymentRepository
jest.mock("../../repository/paymentRepository");

describe("PaymentService", () => {
  let paymentService;

  beforeEach(() => {
    paymentService = new PaymentService(new PaymentRepository());
  });

  // Positive Case for getAllPayments
  it("should return a list of Payments", async () => {
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
    PaymentRepository.prototype.getAllPayments.mockResolvedValue(mockPayments);

    const payments = await paymentService.getAllPayments();
    expect(payments).toEqual(mockPayments);
  });

  // Positive Case for createPayment
  it("should create and return a new payment", async () => {
    const newPayment = { method: "Cash on Delivery", orderId: 1 };
    const createdPayment = { id: 4, ...newPayment };
    PaymentRepository.prototype.createPayment.mockResolvedValue(createdPayment);

    const payment = await paymentService.createPayment(newPayment);
    expect(payment).toEqual(createdPayment);
  });

  // Positive Case for getPaymentById
  it("should return a payment by id", async () => {
    const id = 4;
    const foundPayment = { method: "Cash on Delivery", orderId: 1 };
    PaymentRepository.prototype.getPaymentById.mockResolvedValue(foundPayment);

    const payment = await paymentService.getPaymentById(id);
    expect(payment).toEqual(foundPayment);
  });

  // Positive Case for updatePayment
  it("should update and return the payment", async () => {
    const id = 4;
    const updatedData = { method: "COD", orderId: 1 };
    const updatedPayment = { id, ...updatedData };
    PaymentRepository.prototype.updatePayment.mockResolvedValue(updatedPayment);

    const payment = await paymentService.updatePayment(
      id,
      updatedData.method,
      updatedData.orderId
    );
    expect(payment).toEqual(updatedPayment);
  });

  // Positive Case for deletePayment
  it("should delete the payment and return the number of deleted payments", async () => {
    const id = 1;
    PaymentRepository.prototype.deletePayment.mockResolvedValue(1);

    const result = await paymentService.deletePayment(id);
    expect(result).toBe(1);
  });

  // Negative Case for handling errors
  it("should throw an error when getAllPayments fails", async () => {
    PaymentRepository.prototype.getAllPayments.mockRejectedValue(
      new Error("Database error")
    );

    await expect(paymentService.getAllPayments()).rejects.toThrow(
      "Database error"
    );
  });

  it("should throw an error when createPayment fails", async () => {
    const newPayment = { method: "Cash on Delivery", orderId: 1 };
    PaymentRepository.prototype.createPayment.mockRejectedValue(
      new Error("Database error")
    );

    await expect(paymentService.createPayment(newPayment)).rejects.toThrow(
      "Database error"
    );
  });

  it("should throw an error when getPaymentById fails", async () => {
    const id = 4;
    PaymentRepository.prototype.getPaymentById.mockRejectedValue(
      new Error("Database error")
    );

    await expect(paymentService.getPaymentById(id)).rejects.toThrow(
      "Database error"
    );
  });

  it("should throw an error when updatePayment fails", async () => {
    const id = 4;
    const updatedData = { method: "COD", orderId: 1 };

    PaymentRepository.prototype.updatePayment.mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      paymentService.updatePayment(id, updatedData.method, updatedData.orderId)
    ).rejects.toThrow("Database error");
  });

  it("should throw an error when deletePayment fails", async () => {
    const id = 4;
    PaymentRepository.prototype.deletePayment.mockRejectedValue(
      new Error("Database error")
    );

    await expect(paymentService.deletePayment(id)).rejects.toThrow(
      "Database error"
    );
  });
});
