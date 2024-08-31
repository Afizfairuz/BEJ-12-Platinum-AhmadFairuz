const OrderService = require("../../service/orderService");
const OrderRepository = require("../../repository/OrderRepository");

jest.mock("../../repository/OrderRepository"); 

describe('OrderService', () => {
  let orderService;
  let orderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new OrderService(orderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const mockOrders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
      orderRepository.getAllOrders.mockResolvedValue(mockOrders);

      const orders = await orderService.getAllOrders();

      expect(orderRepository.getAllOrders).toHaveBeenCalledTimes(1);
      expect(orders).toEqual(mockOrders);
    });

    it('should throw an error if fetching orders fails', async () => {
      orderRepository.getAllOrders.mockRejectedValue(new Error('Database error'));

      await expect(orderService.getAllOrders()).rejects.toThrow('Failed to fetch orders: Database error');
    });
  });

  describe('getOrderById', () => {
    it('should return the order by id', async () => {
      const mockOrder = { id: 1, name: 'Order 1' };
      orderRepository.getOrderById.mockResolvedValue(mockOrder);

      const order = await orderService.getOrderById(1);

      expect(orderRepository.getOrderById).toHaveBeenCalledWith(1);
      expect(order).toEqual(mockOrder);
    });

    it('should throw an error if fetching order fails', async () => {
      orderRepository.getOrderById.mockRejectedValue(new Error('Database error'));

      await expect(orderService.getOrderById(1)).rejects.toThrow('Failed to fetch order: Database error');
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const mockOrderData = { name: 'Order 1' };
      const mockOrder = { id: 1, ...mockOrderData };
      orderRepository.createOrder.mockResolvedValue(mockOrder);

      const order = await orderService.createOrder(mockOrderData);

      expect(orderRepository.createOrder).toHaveBeenCalledWith(mockOrderData);
      expect(order).toEqual(mockOrder);
    });

    it('should throw an error if creating order fails', async () => {
      orderRepository.createOrder.mockRejectedValue(new Error('Database error'));

      await expect(orderService.createOrder({ name: 'Order 1' })).rejects.toThrow('Failed to create order: Database error');
    });
  });

  describe('updateOrder', () => {
    it('should update the order if found', async () => {
      const mockOrderData = { name: 'Updated Order' };
      const mockOrder = { id: 1, ...mockOrderData };
      orderRepository.updateOrder.mockResolvedValue(mockOrder);

      const order = await orderService.updateOrder(1, mockOrderData);

      expect(orderRepository.updateOrder).toHaveBeenCalledWith(1, mockOrderData);
      expect(order).toEqual(mockOrder);
    });

    it('should throw an error if updating order fails', async () => {
      orderRepository.updateOrder.mockRejectedValue(new Error('Database error'));

      await expect(orderService.updateOrder(1, { name: 'Updated Order' })).rejects.toThrow('Failed to update order: Database error');
    });
  });

  describe('deleteOrder', () => {
    it('should delete the order if found', async () => {
      orderRepository.deleteOrder.mockResolvedValue(true);

      const result = await orderService.deleteOrder(1);

      expect(orderRepository.deleteOrder).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should throw an error if deleting order fails', async () => {
      orderRepository.deleteOrder.mockRejectedValue(new Error('Database error'));

      await expect(orderService.deleteOrder(1)).rejects.toThrow('Failed to delete order: Database error');
    });
  });
});
