const ItemHandler = require("../itemHandler");
const ItemService = require("../../service/itemService");

// Mocking the ItemService
jest.mock("../../service/itemService");

describe("ItemHandler", () => {
  let itemHandler;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    itemHandler = new ItemHandler(new ItemService());

    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  // Test for getAllItems
  it("should return a list of items", async () => {
    const mockItems = [
      {
        id: 1,
        categoryId: 1,
        name: "Laptop",
        description: "laptop high performance",
        price: 1200,
        stock: 10,
      },
      {
        id: 2,
        categoryId: 1,
        name: "Smartphone",
        description: "model with advanced features",
        price: 800,
        stock: 20,
      },
    ];
    ItemService.prototype.getAllItems.mockResolvedValue(mockItems);

    mockRequest = {};

    await itemHandler.getAll(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(mockItems);
  });

  // Test for createItem
  it("should create and return a new item", async () => {
    const newItem = {
      categoryId: 2,
      name: "Kemeja",
      description: "Cotton cloth with trend style",
      price: 600,
      stock: 29,
    };
    const createdItem = { id: 1, ...newItem };
    ItemService.prototype.createItem.mockResolvedValue(createdItem);

    mockRequest = { body: newItem };

    await itemHandler.create(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createdItem);
  });

  // Test for getItemById
  it("should return a item by id", async () => {
    const id = 4;
    const foundItem = {
      id: 4,
      categoryId: 2,
      name: "Kemeja",
      description: "Cotton cloth with trend style",
      price: 600,
      stock: 29,
    };
    ItemService.prototype.getItemById.mockResolvedValue(foundItem);

    mockRequest = { params: { id } };

    await itemHandler.getById(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(foundItem);
  });

  // Test for updateItem
  it("should update and return the item", async () => {
    const id = 4;
    const updatedData = {
      categoryId: 2,
      name: "Jacket",
      description: "New Jacket with trend style",
      price: 1600,
      stock: 19,
    };
    const updatedItem = { id, ...updatedData };
    ItemService.prototype.updateItem.mockResolvedValue(updatedItem);

    mockRequest = { params: { id }, body: updatedData };

    await itemHandler.updateById(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedItem);
  });

  // Test for deleteItem
  it("should delete the item and return status 204", async () => {
    const id = 4;
    ItemService.prototype.deleteItem.mockResolvedValue(1);

    mockRequest = { params: { id } };

    await itemHandler.deleteById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    // expect(mockResponse.send).toHaveBeenCalled(1);
  });

  // Test for error handling
  it("should return status 500 when getAllItems throws an error", async () => {
    ItemService.prototype.getAllItems.mockRejectedValue(
      new Error("Database error")
    );

    await itemHandler.getAll(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Database error",
    });
  });

  // Similar tests for other methods when they throw errors
});
