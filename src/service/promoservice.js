const PromoRepository = require('../repository/promorepository');

class PromoService {
    constructor() {
        this.promoRepository = new PromoRepository();
    }

    async getAllPromos() {
        return await this.promoRepository.getAllPromos();
    }

    async getEligiblePromos() {
        return await this.promoRepository.getEligiblePromos();
    }

    async createPromo(promoData) {
        await this.promoRepository.createPromo(promoData);
    }

    async updatePromo(promoId, updateData) {
        return await this.promoRepository.updatePromo(promoId, updateData);
    }

    async deletePromo(promoId) {
        return await this.promoRepository.deletePromo(promoId);
    }
}

module.exports = PromoService;
