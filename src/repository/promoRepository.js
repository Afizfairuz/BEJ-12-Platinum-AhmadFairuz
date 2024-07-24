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

    async getById(id) {
        return await Promo.findOne({
            where: { id: id }
        })
    }

    async update(existingPromo, updatedPromo) {
        var updateDescription = false
        var updatePromoImage = false
        if (updatedPromo.description) {
            existingPromo.description = updatedPromo.description
            updateDescription = true
        }

        if (updatedPromo.promoImage) {
            existingPromo.promoImage = updatedPromo.promoImage
            updatePromoImage = true
        }

        if (updateDescription || updatePromoImage) {
            await existingPromo.save()
        }
        
    }
}

module.exports = PromoRepository;