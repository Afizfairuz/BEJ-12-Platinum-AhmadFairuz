const ItemService = require("../service/itemService");

class ItemHandler {
  constructor() {
    this.itemService = new ItemService();
  }

  async getAll(req, res) {
    try {
      const items = await this.itemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await this.itemService.getItemById(req.params.id);
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newItem = await this.itemService.createItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const updatedItem = await this.itemService.updateItem(
        req.params.id,
        req.body
      );
      if (updatedItem) {
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const deleted = await this.itemService.deleteItem(req.params.id);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ItemHandler;
