const express = require('express');

const PromoHandler = require('../handler/promoHandler');
const PromoService = require('../service/promoService');
const PromoRepository = require('../repository/promoRepository');

const promoRepository = new PromoRepository();
const promoService = new PromoService(promoRepository);
const promoHandler = new PromoHandler(promoService);

const router = express.Router();

router.get('/promos', promoHandler.getAll);
router.post('/add', promoHandler.add);
router.get('/get-by-id', promoHandler.getById);

module.exports = router;