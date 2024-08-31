const PromoHandler = require("../../handler/promoHandler");

describe('PromoHandler', () => {
    let promoHandler;
    let mockService;

    beforeEach(() => {
        mockService = {
            getAll: jest.fn(),
            add: jest.fn(),
            getById: jest.fn(),
        };
        promoHandler = new PromoHandler(mockService);
    });

    describe('getAll', () => {
        it('should return all promos with correct status code and payload', async () => {
            const mockResponse = {
                statusCode: 200,
                payload: [{ id: 1, name: 'Promo 1' }],
            };
            mockService.getAll.mockResolvedValue(mockResponse);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await promoHandler.getAll(req, res);

            expect(mockService.getAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockResponse.payload);
        });
    });

    describe('add', () => {
        it('should add a new promo and return the correct status code and payload', async () => {
            const mockPromo = { name: 'New Promo' };
            const mockResponse = {
                statusCode: 201,
                payload: { id: 2, name: 'New Promo' },
            };
            mockService.add.mockResolvedValue(mockResponse);

            const req = { body: mockPromo };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await promoHandler.add(req, res);

            expect(mockService.add).toHaveBeenCalledWith(mockPromo);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockResponse.payload);
        });
    });

    describe('getById', () => {
        it('should return the correct promo by id with the correct status code and payload', async () => {
            const mockId = 1;
            const mockResponse = {
                statusCode: 200,
                payload: { id: 1, name: 'Promo 1' },
            };
            mockService.getById.mockResolvedValue(mockResponse);

            const req = { query: { id: mockId } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await promoHandler.getById(req, res);

            expect(mockService.getById).toHaveBeenCalledWith(mockId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockResponse.payload);
        });
    });
});
