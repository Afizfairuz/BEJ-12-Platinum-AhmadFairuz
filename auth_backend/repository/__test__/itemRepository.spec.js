const SequelizeMock = require("sequelize-mock");
const ItemRepository = require("../../repository/ItemRepository");

// Membuat instance mock untuk Sequelize
const db = new SequelizeMock();

// Mendefinisikan mock untuk model Item
const Item = db.define('Item', {});

// Mengganti Item dengan mock Item
jest.mock("../../../models/item", () => {
  return {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn()
  };
});

// Import Item setelah mendefinisikan mock
const ItemModel = require("../../../models/item");

describe('ItemRepository', () => {
  let itemRepository;

  beforeEach(() => {
    itemRepository = new ItemRepository();
  });

  it('should return a list of items from getAllItems', async () => {
    const mockItems = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }];
    ItemModel.findAll.mockResolvedValue(mockItems);

    const items = await itemRepository.getAllItems();
    expect(items).toEqual(mockItems);
    expect(ItemModel.findAll).toHaveBeenCalled();
  });

  it('should return an item by id from getItemById', async () => {
    const mockItem = { id: 1, name: 'Item1' };
    ItemModel.findByPk.mockResolvedValue(mockItem);

    const item = await itemRepository.getItemById(1);
    expect(item).toEqual(mockItem);
    expect(ItemModel.findByPk).toHaveBeenCalledWith(1);
  });

  it('should create a new item from createItem', async () => {
    const newItem = { name: 'Item1' };
    const createdItem = { id: 1, ...newItem };
    ItemModel.create.mockResolvedValue(createdItem);

    const item = await itemRepository.createItem(newItem);
    expect(item).toEqual(createdItem);
    expect(ItemModel.create).toHaveBeenCalledWith(newItem);
  });

  it('should delete an item by name from deleteByName', async () => {
    ItemModel.destroy.mockResolvedValue(1); // Mocking that 1 row is deleted

    await itemRepository.deleteByName('Item1');
    expect(ItemModel.destroy).toHaveBeenCalledWith({
      where: { name: 'Item1' }
    });
  });

  it('should update an item by id from updateItem', async () => {
    const existingItem = { id: 1, name: 'Item1', update: jest.fn().mockResolvedValue({ id: 1, name: 'UpdatedItem' }) };
    ItemModel.findByPk.mockResolvedValue(existingItem);

    const updatedItem = await itemRepository.updateItem(1, { name: 'UpdatedItem' });
    expect(updatedItem).toEqual({ id: 1, name: 'UpdatedItem' });
    expect(ItemModel.findByPk).toHaveBeenCalledWith(1);
    expect(existingItem.update).toHaveBeenCalledWith({ name: 'UpdatedItem' });
  });

  it('should delete an item by id from deleteItem', async () => {
    const existingItem = { id: 1, destroy: jest.fn().mockResolvedValue(true) };
    ItemModel.findByPk.mockResolvedValue(existingItem);

    const result = await itemRepository.deleteItem(1);
    expect(result).toBe(true);
    expect(ItemModel.findByPk).toHaveBeenCalledWith(1);
    expect(existingItem.destroy).toHaveBeenCalled();
  });

  it('should return false when deleteItem cannot find item', async () => {
    ItemModel.findByPk.mockResolvedValue(null);

    const result = await itemRepository.deleteItem(999);
    expect(result).toBe(false);
    expect(ItemModel.findByPk).toHaveBeenCalledWith(999);
  });
});
