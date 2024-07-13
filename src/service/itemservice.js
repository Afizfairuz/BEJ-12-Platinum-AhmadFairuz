const itemRepository = require('../repository/itemrepository');

class ItemService {
    async getAllItems() {
        return itemRepository.getAllItems();
    }

    async getItemById(id) {
        return itemRepository.getById(id);
    }

    async updateItem(id, updateData) {
        return itemRepository.update(id, updateData);
    }

    async deleteItem(id) {
        return itemRepository.delete(id);
    }

    async uploadMedia(id, media) {
        return itemRepository.uploadMedia(id, media);
    }
}

module.exports = ItemService;
