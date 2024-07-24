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

    async getById(id) {
        try {
            const foundPromo = await this.repository.getById(id)
            return Common.responseToFE(true, 200, foundPromo, null);
        } catch (error) {
            return Common.responseToFE(false, 502, null, `${error.message}`);
        }
    }

    async update(updatedPromo) {
        try {
            const foundPromo = await this.repository.getById(updatedPromo.id)
            if (foundPromo) {
                await this.repository.updateStatus(foundPromo, updatedPromo)
                const reFoundPromo = await this.repository.getById(updatedPromo.id)
                return Common.responseToFE(true, 200, reFoundPromo, null)
            } else {
                throw new Error('mismatchId')
            }
        } catch (error) {
            switch (error) {
                case 'mismatchId':
                    return Common.responseToFE(false, 403, null, "id not found")
                default:
                    return Common.responseToFE(false, 503, null, `${error.message}`)
            }
        }
    }
}

module.exports = PromoService;