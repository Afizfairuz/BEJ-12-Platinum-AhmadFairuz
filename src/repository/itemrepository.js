class ItemRepository {
    constructor() {
        this.items = [];
    }

    async getAllItems() {
        return this.items;
    }

    async getById(id) {
        return this.items.find(item => item.id === id);
    }

    async update(id, updateData) {
        const item = await this.getById(id);
        if (item) {
            Object.assign(item, updateData);
            return item;
        }
        return null;
    }

    async delete(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    async uploadMedia(id, media) {
        const item = await this.getById(id);
        if (item) {
            item.media = media;
            return item;
        }
        return null;
    }
}

module.exports = ItemRepository;
