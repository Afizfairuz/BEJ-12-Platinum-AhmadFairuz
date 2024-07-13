const PromoService = require('../service/promoservice');

class PromoHandler {
    constructor() {
        this.promoService = new PromoService();
    }

    getAllPromos = async (req, res, next) => {
        try {
            const promos = await this.promoService.getAllPromos();
            res.status(200).json(promos);
        } catch (error) {
            next(error);
        }
    }

    getEligiblePromos = async (req, res, next) => {
        try {
            const promos = await this.promoService.getEligiblePromos();
            res.status(200).json(promos);
        } catch (error) {
            next(error);
        }
    }

    createPromo = async (req, res, next) => {
        const promoData = req.body;
        try {
            await this.promoService.createPromo(promoData);
            res.status(201).send('Promo created successfully');
        } catch (error) {
            next(error);
        }
    }

    updatePromo = async (req, res, next) => {
        const promoId = req.params.promoId;
        const updateData = req.body;
        try {
            const updatedPromo = await this.promoService.updatePromo(promoId, updateData);
            res.status(200).json(updatedPromo);
        } catch (error) {
            next(error);
        }
    }

    deletePromo = async (req, res, next) => {
        const promoId = req.params.promoId;
        try {
            await this.promoService.deletePromo(promoId);
            res.status(200).send('Promo deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PromoHandler;
