const PromoService = require("../../service/promoService");
const Common = require("../../common/common");

jest.mock("../../common/common", () => ({
    responseToFE: jest.fn(),
}));

describe('PromoService', () => {
    let promoService;
    let mockRepository;

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn(),
            add: jest.fn(),
            getById: jest.fn(),
            updateStatus: jest.fn(),
        };
        promoService = new PromoService(mockRepository);
    });

    describe('getAll', () => {
        it('should return all promos with success response', async () => {
            const mockPromos = [{ id: 1, name: 'Promo 1' }];
            mockRepository.getAll.mockResolvedValue(mockPromos);

            await promoService.getAll();

            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
            expect(Common.responseToFE).toHaveBeenCalledWith(true, 200, mockPromos, null);
        });

        it('should handle error and return error response', async () => {
            const mockError = new Error('Database error');
            mockRepository.getAll.mockRejectedValue(mockError);

            await promoService.getAll();

            expect(Common.responseToFE).toHaveBeenCalledWith(false, 502, null, mockError.message);
        });
    });

    describe('add', () => {
        it('should add a new promo with success response', async () => {
            const mockPromo = { name: 'New Promo' };
            const mockNewPromo = { id: 2, name: 'New Promo' };
            mockRepository.add.mockResolvedValue(mockNewPromo);

            await promoService.add(mockPromo);

            expect(mockRepository.add).toHaveBeenCalledWith(mockPromo);
            expect(Common.responseToFE).toHaveBeenCalledWith(true, 200, mockNewPromo, null);
        });

        it('should handle error and return error response', async () => {
            const mockPromo = { name: 'New Promo' };
            const mockError = new Error('Database error');
            mockRepository.add.mockRejectedValue(mockError);

            await promoService.add(mockPromo);

            expect(Common.responseToFE).toHaveBeenCalledWith(false, 502, null, mockError.message);
        });
    });

    describe('getById', () => {
        it('should return the correct promo by id with success response', async () => {
            const mockId = 1;
            const mockPromo = { id: 1, name: 'Promo 1' };
            mockRepository.getById.mockResolvedValue(mockPromo);

            await promoService.getById(mockId);

            expect(mockRepository.getById).toHaveBeenCalledWith(mockId);
            expect(Common.responseToFE).toHaveBeenCalledWith(true, 200, mockPromo, null);
        });

        it('should handle error and return error response', async () => {
            const mockId = 1;
            const mockError = new Error('Database error');
            mockRepository.getById.mockRejectedValue(mockError);

            await promoService.getById(mockId);

            expect(Common.responseToFE).toHaveBeenCalledWith(false, 502, null, mockError.message);
        });
    });

    describe('update', () => {
        it('should update the promo with success response', async () => {
            const mockPromo = { id: 1, name: 'Updated Promo' };
            const mockExistingPromo = { id: 1, name: 'Old Promo' };
            mockRepository.getById.mockResolvedValueOnce(mockExistingPromo);
            mockRepository.updateStatus.mockResolvedValueOnce();
            mockRepository.getById.mockResolvedValueOnce(mockPromo);

            await promoService.update(mockPromo);

            expect(mockRepository.getById).toHaveBeenCalledWith(mockPromo.id);
            expect(mockRepository.updateStatus).toHaveBeenCalledWith(mockExistingPromo, mockPromo);
            expect(Common.responseToFE).toHaveBeenCalledWith(true, 200, mockPromo, null);
        });

        it('should handle mismatchId error and return error response', async () => {
            const mockPromo = { id: 1, name: 'Updated Promo' };
            mockRepository.getById.mockResolvedValue(null);

            const updatePromo = await promoService.update(mockPromo);
            const response = Common.responseToFE(false, 403, null, 'id not found'); 
            expect(updatePromo).toEqual(response);
        });

        it('should handle other errors and return error response', async () => {
            const mockPromo = { id: 1, name: 'Updated Promo' };
            const mockError = new Error('Database error');
            mockRepository.getById.mockRejectedValue(mockError);

            await promoService.update(mockPromo);

            expect(Common.responseToFE).toHaveBeenCalledWith(false, 503, null, mockError.message);
        });
    });
});
