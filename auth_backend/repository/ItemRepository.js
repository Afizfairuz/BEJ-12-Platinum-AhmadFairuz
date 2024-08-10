const Item = require("../../models/item");

class ItemRepository {
  async getAllItems() {
    return await Item.findAll();
  }

  async getItemById(id) {
    return await Item.findByPk(id);
  }

  async createItem(itemData) {
    return await Item.create(itemData);
  }

  async deleteByName(name) {
    await Item.destroy({
      where: {
        name: name,
      },
    });
  }

  async updateItem(id, itemData) {
    const item = await Item.findByPk(id);
    if (item) {
      return await item.update(itemData);
    }
    return null;
  }

  async deleteItem(id) {
    const item = await Item.findByPk(id);
    if (item) {
      await item.destroy();
      return true;
    }
    return false;
  }
}

module.exports = ItemRepository;
