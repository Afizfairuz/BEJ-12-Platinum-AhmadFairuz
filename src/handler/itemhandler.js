const itemService = require('../service/itemservice');

class ItemHandler {
    async getAllItems(req, res) {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
    }

    async getItemById(req, res) {
        const id = req.params.id;
        const item = await itemService.getItemById(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }

    async updateItem(req, res) {
        const id = req.params.id;
        const updateData = req.body;
        const item = await itemService.updateItem(id, updateData);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }

    async deleteItem(req, res) {
        const id = req.params.id;
        const success = await itemService.deleteItem(id);
        if (success) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }

    async uploadMedia(req, res) {
        const id = req.params.id;
        const media = req.body.media; // Assuming media is sent as a base64 encoded string
        const item = await itemService.uploadMedia(id, media);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
}

module.exports = ItemHandler;
