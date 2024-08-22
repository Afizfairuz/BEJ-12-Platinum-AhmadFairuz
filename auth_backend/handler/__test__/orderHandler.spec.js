const OrderHandler = require("../../handler/orderHandler");
const OrderService = require("../../service/orderService");

jest.mock("../../service/orderService");

describe('OrderHandler', () => {
  let orderHandler;
  let orderService;
  let mockReq, mockRes;

  beforeEach(() => {
    orderService = new OrderService();
    orderHandler = new OrderHandler(orderService);

    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all orders with status 200', async () => {
      const mockOrders = [{ id: 1, name: 'Order 1' }];
      orderService.getAllOrders.mockResolvedValue(mockOrders);

      await orderHandler.getAll(mockReq, mockRes);

      expect(orderService.getAllOrders).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
    });

    it('should return status 500 if an error occurs', async () => {
      orderService.getAllOrders.mockRejectedValue(new Error('Database error'));

      await orderHandler.getAll(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('getById', () => {
    it('should return the order with status 200 if found', async () => {
      const mockOrder = { id: 1, name: 'Order 1' };
      mockReq.params.id = 1;
      orderService.getOrderById.mockResolvedValue(mockOrder);

      await orderHandler.getById(mockReq, mockRes);

      expect(orderService.getOrderById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return status 404 if order not found', async () => {
      mockReq.params.id = 1;
      orderService.getOrderById.mockResolvedValue(null);

      await orderHandler.getById(mockReq, mockRes);

      expect(orderService.getOrderById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should return status 500 if an error occurs', async () => {
      mockReq.params.id = 1;
      orderService.getOrderById.mockRejectedValue(new Error('Database error'));

      await orderHandler.getById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('create', () => {
    it('should create a new order with status 201', async () => {
      const mockOrder = { id: 1, name: 'Order 1' };
      mockReq.body = { name: 'Order 1' };
      orderService.createOrder.mockResolvedValue(mockOrder);

      await orderHandler.create(mockReq, mockRes);

      expect(orderService.createOrder).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return status 500 if an error occurs', async () => {
      mockReq.body = { name: 'Order 1' };
      orderService.createOrder.mockRejectedValue(new Error('Database error'));

      await orderHandler.create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('updateById', () => {
    it('should update the order with status 200 if found', async () => {
      const mockOrder = { id: 1, name: 'Updated Order' };
      mockReq.params.id = 1;
      mockReq.body = { name: 'Updated Order' };
      orderService.updateOrder.mockResolvedValue(mockOrder);

      await orderHandler.updateById(mockReq, mockRes);

      expect(orderService.updateOrder).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return status 404 if order not found', async () => {
      mockReq.params.id = 1;
      mockReq.body = { name: 'Updated Order' };
      orderService.updateOrder.mockResolvedValue(null);

      await orderHandler.updateById(mockReq, mockRes);

      expect(orderService.updateOrder).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should return status 500 if an error occurs', async () => {
      mockReq.params.id = 1;
      mockReq.body = { name: 'Updated Order' };
      orderService.updateOrder.mockRejectedValue(new Error('Database error'));

      await orderHandler.updateById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('deleteById', () => {
    it('should delete the order with status 204 if found', async () => {
      mockReq.params.id = 1;
      orderService.deleteOrder.mockResolvedValue(true);

      await orderHandler.deleteById(mockReq, mockRes);

      expect(orderService.deleteOrder).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.end).toHaveBeenCalledTimes(1);
    });

    it('should return status 404 if order not found', async () => {
      mockReq.params.id = 1;
      orderService.deleteOrder.mockResolvedValue(false);

      await orderHandler.deleteById(mockReq, mockRes);

      expect(orderService.deleteOrder).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should return status 500 if an error occurs', async () => {
      mockReq.params.id = 1;
      orderService.deleteOrder.mockRejectedValue(new Error('Database error'));

      await orderHandler.deleteById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});
