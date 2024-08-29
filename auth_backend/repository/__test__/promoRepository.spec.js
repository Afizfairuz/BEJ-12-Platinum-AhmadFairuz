const PromoRepository = require("../../repository/promoRepository");
const Promo = require("../../../models/promo");

jest.mock("../../../models/promo");

describe('PromoRepository', () => {
    let promoRepository;

    beforeEach(() => {
        promoRepository = new PromoRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all promo items', async () => {
        const mockPromos = [
            { id: 1, description: 'Promo 1', promoImage: 'image1.png' },
            { id: 2, description: 'Promo 2', promoImage: 'image2.png' }
        ];

        Promo.findAll.mockResolvedValue(mockPromos);

        const result = await promoRepository.getAll();

        expect(result).toEqual(mockPromos);
        expect(Promo.findAll).toHaveBeenCalledTimes(1);
    });

    it('should add a new promo', async () => {
        const newPromo = {
            description: 'New Promo',
            promoImage: 'newImage.png'
        };

        const createdPromo = { id: 1, ...newPromo };
        Promo.create.mockResolvedValue(createdPromo);

        const result = await promoRepository.add(newPromo);

        expect(result).toEqual(createdPromo);
        expect(Promo.create).toHaveBeenCalledWith(newPromo);
    });

    it('should return promo by id', async () => {
        const promoId = 1;
        const mockPromo = { id: promoId, description: 'Promo 1', promoImage: 'image1.png' };

        Promo.findOne.mockResolvedValue(mockPromo);

        const result = await promoRepository.getById(promoId);

        expect(result).toEqual(mockPromo);
        expect(Promo.findOne).toHaveBeenCalledWith({ where: { id: promoId } });
    });

    it('should update an existing promo', async () => {
        const existingPromo = { id: 1, description: 'Old Promo', promoImage: 'oldImage.png' };
        const updatedPromo = { description: 'Updated Promo', promoImage: 'updatedImage.png' };

        existingPromo.save = jest.fn().mockResolvedValue(undefined);

        await promoRepository.update(existingPromo, updatedPromo);

        expect(existingPromo.description).toEqual(updatedPromo.description);
        expect(existingPromo.promoImage).toEqual(updatedPromo.promoImage);
        expect(existingPromo.save).toHaveBeenCalledTimes(1);
    });

    it('should not update if no changes are provided', async () => {
        const existingPromo = { id: 1, description: 'Same Promo', promoImage: 'sameImage.png' };
        const updatedPromo = {};

        existingPromo.save = jest.fn();

        await promoRepository.update(existingPromo, updatedPromo);

        expect(existingPromo.save).not.toHaveBeenCalled();
    });
});
