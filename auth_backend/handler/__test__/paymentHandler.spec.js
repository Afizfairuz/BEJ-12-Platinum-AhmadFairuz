const PaymentHandler = require("../paymentHandler");
const PaymentService = require("../../service/paymentService");

// Mocking the PaymentService
jest.mock("../../service/paymentService");

describe("PaymentHandler", () => {
  let paymentHandler;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    paymentHandler = new PaymentHandler(new PaymentService());

    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  // Test for getAllPayments
  it("should return a list of payments", async () => {
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
    PaymentService.prototype.getAllPayments.mockResolvedValue(mockPayments);

    mockRequest = {};

    await paymentHandler.getAll(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPayments);
  });

  // Test for createPayment
  it("should create and return a new payment", async () => {
    const newPayment = { method: "Cash on Delivery", orderId: 1 };
    const createdPayment = { id: 1, ...newPayment };
    PaymentService.prototype.createPayment.mockResolvedValue(createdPayment);

    mockRequest = { body: newPayment };

    await paymentHandler.create(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createdPayment);
  });

  // Test for getPaymentById
  it("should return a payment by id", async () => {
    const id = 4;
    const foundPayment = { method: "Cash on Delivery", orderId: 1 };
    PaymentService.prototype.getPaymentById.mockResolvedValue(foundPayment);

    mockRequest = { params: { id } };

    await paymentHandler.getById(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(foundPayment);
  });

  // Test for updatePayment
  it("should update and return the payment", async () => {
    const id = 4;
    const updatedData = { method: "COD", orderId: 1 };
    const updatedPayment = { id, ...updatedData };
    PaymentService.prototype.updatePayment.mockResolvedValue(updatedPayment);

    mockRequest = { params: { id }, body: updatedData };

    await paymentHandler.updateById(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedPayment);
  });

  // Test for deletePayment
  it("should delete the payment and return status 204", async () => {
    const id = 4;
    PaymentService.prototype.deletePayment.mockResolvedValue(1);

    mockRequest = { params: { id } };

    await paymentHandler.deleteById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    // expect(mockResponse.send).toHaveBeenCalled(1);
  });

  // Test for error handling
  it("should return status 500 when getAllPayments throws an error", async () => {
    PaymentService.prototype.getAllPayments.mockRejectedValue(
      new Error("Database error")
    );

    await paymentHandler.getAll(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Database error",
    });
  });
});
