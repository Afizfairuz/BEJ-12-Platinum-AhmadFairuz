const Common = require('../common/common');
class PromoService {
    constructor(repository) {
        this.repository = repository
    }

    async getAll() {
        try {
            const allPromos = await this.repository.getAll()
            return Common.responseToFE(true, 200, allPromos, null);
        } catch (error) {
            return Common.responseToFE(false, 502, null, `${error.message}`);
        }
    }

    async add(promo) {
        try {
            const newPromo = await this.repository.add(promo)
            return Common.responseToFE(true, 200, newPromo, null);
        } catch (error) {
            return Common.responseToFE(false, 502, null, `${error.message}`);
        }
    }
}

module.exports = PromoService;