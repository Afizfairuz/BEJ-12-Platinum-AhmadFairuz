const OrderRepository = require("../../repository/OrderRepository");
const Order = require("../../../models/order");

jest.mock("../../../models/order");

describe('OrderRepository', () => {
  let orderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const mockOrders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
      Order.findAll.mockResolvedValue(mockOrders);

      const orders = await orderRepository.getAllOrders();

      expect(Order.findAll).toHaveBeenCalledTimes(1);
      expect(orders).toEqual(mockOrders);
    });
  });

  describe('getOrderById', () => {
    it('should return the order by id', async () => {
      const mockOrder = { id: 1, name: 'Order 1' };
      Order.findByPk.mockResolvedValue(mockOrder);

      const order = await orderRepository.getOrderById(1);

      expect(Order.findByPk).toHaveBeenCalledWith(1);
      expect(order).toEqual(mockOrder);
    });

    it('should return null if order is not found', async () => {
      Order.findByPk.mockResolvedValue(null);

      const order = await orderRepository.getOrderById(1);

      expect(Order.findByPk).toHaveBeenCalledWith(1);
      expect(order).toBeNull();
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const mockOrderData = { name: 'Order 1' };
      const mockOrder = { id: 1, ...mockOrderData };
      Order.create.mockResolvedValue(mockOrder);

      const order = await orderRepository.createOrder(mockOrderData);

      expect(Order.create).toHaveBeenCalledWith(mockOrderData);
      expect(order).toEqual(mockOrder);
    });
  });

  describe('updateOrder', () => {
    it('should update the order if found', async () => {
      const mockOrder = { id: 1, name: 'Order 1', update: jest.fn().mockResolvedValue(true) };
      const mockOrderData = { name: 'Updated Order' };
      Order.findByPk.mockResolvedValue(mockOrder);

      const updatedOrder = await orderRepository.updateOrder(1, mockOrderData);

      expect(Order.findByPk).toHaveBeenCalledWith(1);
      expect(mockOrder.update).toHaveBeenCalledWith(mockOrderData);
      expect(updatedOrder).toEqual(true);
    });

    it('should return null if order is not found', async () => {
      Order.findByPk.mockResolvedValue(null);

      const updatedOrder = await orderRepository.updateOrder(1, { name: 'Updated Order' });

      expect(Order.findByPk).toHaveBeenCalledWith(1);
      expect(updatedOrder).toBeNull();
    });
  });

  describe('deleteOrder', () => {
    it('should delete the order if found', async () => {
      const mockOrder = { id: 1, destroy: jest.fn().mockResolvedValue(true) };
      Order.findByPk.mockResolvedValue(mockOrder);

      const result = await orderRepository.deleteOrder(1);

      expect(Order.findByPk).toHaveBeenCalledWith(1);
      expect(mockOrder.destroy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false if order is not found', async () => {
      Order.findByPk.mockResolvedValue(null);

      const result = await orderRepository.deleteOrder(1);

      expect(Order.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBe(false);
    });
  });
});
