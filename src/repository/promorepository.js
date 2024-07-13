class PromoRepository {
    constructor() {
        this.promos = promos;
    }

    async getAllPromos() {
        return this.promos;
    }

    async getEligiblePromos() {
        return this.promos.filter(promo => promo.eligible);
    }

    async createPromo(promoData) {
        this.promos.push(promoData);
    }

    async updatePromo(promoId, updateData) {
        const promoIndex = this.promos.findIndex(promo => promo.id === promoId);
        if (promoIndex !== -1) {
            this.promos[promoIndex] = { ...this.promos[promoIndex], ...updateData };
            return this.promos[promoIndex];
        }
        return null;
    }

    async deletePromo(promoId) {
        const initialLength = this.promos.length;
        this.promos = this.promos.filter(promo => promo.id !== promoId);
        return this.promos.length !== initialLength;
    }
}

module.exports = PromoRepository;
