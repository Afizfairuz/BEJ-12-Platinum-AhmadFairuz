const ItemService = require("../itemService");
const ItemRepository = require("../../repository/ItemRepository");

// Mocking the ItemRepository
jest.mock("../../repository/ItemRepository");

describe("ItemService", () => {
  let itemService;

  beforeEach(() => {
    itemService = new ItemService(new ItemRepository());
  });

  // Positive Case for getAllItems
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
    ItemRepository.prototype.getAllItems.mockResolvedValue(mockItems);

    const items = await itemService.getAllItems();
    expect(items).toEqual(mockItems);
  });

  // Positive Case for createItem
  it("should create and return a new item", async () => {
    const newItem = {
      categoryId: 2,
      name: "Kemeja",
      description: "Cotton cloth with trend style",
      price: 600,
      stock: 29,
    };
    const createdItem = { id: 4, ...newItem };
    ItemRepository.prototype.createItem.mockResolvedValue(createdItem);

    const item = await itemService.createItem(newItem);
    expect(item).toEqual(createdItem);
  });

  // Positive Case for getItemById
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
    ItemRepository.prototype.getItemById.mockResolvedValue(foundItem);

    const item = await itemService.getItemById(id);
    expect(item).toEqual(foundItem);
  });

  // Positive Case for updateItem
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
    ItemRepository.prototype.updateItem.mockResolvedValue(updatedItem);

    const item = await itemService.updateItem(
      id,
      updatedData.categoryId,
      updatedData.name,
      updatedData.description,
      updatedData.price,
      updatedData.stock
    );
    expect(item).toEqual(updatedItem);
  });

  // Positive Case for deleteItem
  it("should delete the item and return the number of deleted items", async () => {
    const id = 1;
    ItemRepository.prototype.deleteItem.mockResolvedValue(1);

    const result = await itemService.deleteItem(id);
    expect(result).toBe(1);
  });

  // Negative Case for handling errors
  it("should throw an error when getAllItems fails", async () => {
    ItemRepository.prototype.getAllItems.mockRejectedValue(
      new Error("Database error")
    );

    await expect(itemService.getAllItems()).rejects.toThrow("Database error");
  });

  it("should throw an error when createItem fails", async () => {
    const newItem = {
      categoryId: 2,
      name: "Kemeja",
      description: "Cotton cloth with trend style",
      price: 600,
      stock: 29,
    };
    ItemRepository.prototype.createItem.mockRejectedValue(
      new Error("Database error")
    );

    await expect(itemService.createItem(newItem)).rejects.toThrow(
      "Database error"
    );
  });

  it("should throw an error when getItemById fails", async () => {
    const id = 4;
    ItemRepository.prototype.getItemById.mockRejectedValue(
      new Error("Database error")
    );

    await expect(itemService.getItemById(id)).rejects.toThrow("Database error");
  });

  it("should throw an error when updateItem fails", async () => {
    const id = 4;
    const updatedData = {
      categoryId: 2,
      name: "Jacket",
      description: "New Jacket with trend style",
      price: 1600,
      stock: 19,
    };
    ItemRepository.prototype.updateItem.mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      itemService.updateItem(
        id,
        updatedData.categoryId,
        updatedData.name,
        updatedData.description,
        updatedData.price,
        updatedData.stock
      )
    ).rejects.toThrow("Database error");
  });

  it("should throw an error when deleteItem fails", async () => {
    const id = 4;
    ItemRepository.prototype.deleteItem.mockRejectedValue(
      new Error("Database error")
    );

    await expect(itemService.deleteItem(id)).rejects.toThrow("Database error");
  });
});
