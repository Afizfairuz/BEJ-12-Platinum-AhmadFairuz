const Promo = require('../../models/promo');

class PromoRepository {
    async getAll() {
        const allItems = await Promo.findAll();
        return allItems;
    }
}

module.exports = PromoRepository;