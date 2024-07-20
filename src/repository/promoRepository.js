const Promo = require('../../models/promo');

class PromoRepository {
    async getAll() {
        const allItems = await Promo.findAll();
        return allItems;
    }

    async add(promo) {
        const newPromo = await Promo.create({
            description: promo.description,
            promoImage: promo.promoImage
        });
        return newPromo;
    }
}

module.exports = PromoRepository;