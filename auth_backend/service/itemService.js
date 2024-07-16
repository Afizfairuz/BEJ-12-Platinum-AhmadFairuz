const ItemRepository = require("../repository/ItemRepository");

class ItemService {
  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async getAllItems() {
    return await this.itemRepository.getAllItems();
  }

  async getItemById(id) {
    return await this.itemRepository.getItemById(id);
  }

  async createItem(itemData) {
    return await this.itemRepository.createItem(itemData);
  }

  async updateItem(id, itemData) {
    return await this.itemRepository.updateItem(id, itemData);
  }

  async deleteItem(id) {
    return await this.itemRepository.deleteItem(id);
  }
}

module.exports = ItemService;
