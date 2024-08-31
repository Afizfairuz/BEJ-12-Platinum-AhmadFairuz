const request = require('supertest');
const app = require('../../../main');
const express = require('express');
const AuthService = require('../../service/authService'); // Adjust the path accordingly
const AuthHandler = require('../authHandler'); // Adjust the path accordingly


// describe('AuthHandler.register', () => {
//   let authHandler;
//   let mockAuthService;
//   let mockRequest;
//   let mockResponse;

//   beforeEach(() => {
//     // Mock untuk authService
//     mockAuthService = {
//       register: jest.fn()
//     };

//     // Membuat instance dari AuthHandler dengan mock authService
//     authHandler = new AuthHandler(mockAuthService);

//     // Mock request dan response
//     mockRequest = {
//       body: {
//         name: "javid",
//         email: "javid@gmail.com",
//         password: "123"
//       }
//     };

//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn()
//     };
//   });

//   it('berhasil: harus mengembalikan pengguna yang terdaftar', async () => {
//     const expectedRegisterResponse = {
//       statusCode: 201,
//       message: "berhasil melakukan register",
//       createdUser: {
//         id: 1,
//         name: "javid",
//         email: "javid@gmail.com",
//         password: "$2b$10$PJgveb2COp1daGk8r9nrIeA.s3A47xSD63tvRyM73HsmQHtEdaC5m",
//         updatedAt: "2024-08-05T14:50:33.834Z",
//         createdAt: "2024-08-05T14:50:33.834Z"
//       }
//     };

//     // Mocking metode register dari authService
//     mockAuthService.register.mockResolvedValue(expectedRegisterResponse);

//     await authHandler.register(mockRequest, mockResponse);

//     expect(mockAuthService.register).toHaveBeenCalledWith(mockRequest.body);
//     expect(mockResponse.status).toHaveBeenCalledWith(expectedRegisterResponse.statusCode);
//     expect(mockResponse.send).toHaveBeenCalledWith({
//       message: expectedRegisterResponse.message,
//       created_user: expectedRegisterResponse.createdUser
//     });
//   });

//   it('gagal: harus menangani kesalahan dari authService', async () => {
//     const expectedErrorResponse = {
//       statusCode: 500,
//       message: "Terjadi kesalahan"
//     };

//     // Mocking metode register untuk melemparkan kesalahan
//     mockAuthService.register.mockRejectedValue(new Error(expectedErrorResponse.message));

//     // Periksa apakah fungsi register memanggil respon dengan status kesalahan
//     await authHandler.register(mockRequest, mockResponse);

//     expect(mockAuthService.register).toHaveBeenCalledWith(mockRequest.body);
//     expect(mockResponse.status).toHaveBeenCalledWith(expectedErrorResponse.statusCode);
//     expect(mockResponse.send).toHaveBeenCalledWith({
//       message: expectedErrorResponse.message
//     });
//   });
// });



// Mock the AuthService
jest.mock('../../service/AuthService');

describe('AuthHandler.login', () => {
  let app;
  let authServiceMock;

  beforeAll(() => {
    // Initialize the express app and the mock authService
    app = express();
    app.use(express.json());

    authServiceMock = new AuthService();
    
    // Define the login route
    app.post('/login', async (req, res) => {
      const payload = req.body;
      const serviceRes = await authServiceMock.login(payload);

      res.status(serviceRes.statusCode).send({
        message: serviceRes.message,
        token: serviceRes.token,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and a token if login is successful', async () => {
    const mockPayload = { email: 'test@example.com', password: 'password123' };
    const mockServiceResponse = {
      statusCode: 200,
      message: 'Login berhasil',
      token: 'mockedToken'
    };

    authServiceMock.login.mockResolvedValue(mockServiceResponse);

    const response = await request(app).post('/login').send(mockPayload);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login berhasil');
    expect(response.body.token).toBe('mockedToken');
  });

  it('should return 400 if the login fails', async () => {
    const mockPayload = { email: 'test@example.com', password: 'wrongPassword' };
    const mockServiceResponse = {
      statusCode: 400,
      message: 'Login gagal',
      token: null
    };

    authServiceMock.login.mockResolvedValue(mockServiceResponse);

    const response = await request(app).post('/login').send(mockPayload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Login gagal');
    expect(response.body.token).toBeNull();
  });

  it('should return 500 if there is an internal server error', async () => {
    const mockPayload = { email: 'test@example.com', password: 'password123' };
    const mockServiceResponse = {
      statusCode: 500,
      message: 'Terjadi kesalahan: Database error',
      token: null
    };

    authServiceMock.login.mockResolvedValue(mockServiceResponse);

    const response = await request(app).post('/login').send(mockPayload);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Terjadi kesalahan: Database error');
    expect(response.body.token).toBeNull();
  });

  it('should return 404 if the user is not found', async () => {
    const mockPayload = { email: 'nonexistent@example.com', password: 'password123' };
    const mockServiceResponse = {
      statusCode: 404,
      message: 'User not found',
      token: null
    };

    authServiceMock.login.mockResolvedValue(mockServiceResponse);

    const response = await request(app).post('/login').send(mockPayload);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
    expect(response.body.token).toBeNull();
  });
});


describe('Handlers', () => {

  beforeAll(() => {
    mockAuthService = new AuthService();
    
    // Mock metode AuthService
    jest.spyOn(AuthService.prototype, 'createToken').mockResolvedValue({
      statusCode: 200,
      message: 'Token dan session berhasil dibuat',
      data: { token: 'sampleToken' }
    });
    jest.spyOn(AuthService.prototype, 'logout').mockResolvedValue({
      statusCode: 200,
      message: 'Berhasil logout'
    });
    jest.spyOn(AuthService.prototype, 'validateOtp').mockResolvedValue({
      statusCode: 200,
      message: 'OTP berhasil divalidasi',
      data: { userId: 1 }
    });
  });

  afterAll(async () => {
    // Jika ada koneksi atau resource yang harus ditutup, lakukan di sini
  });

  it('should create token and session successfully', async () => {
    const response = await request(app)
      .patch('/auth/token/123')
      .send({ token: 'sampleToken', session: 'sampleSession' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Token dan session berhasil dibuat');
    expect(response.body.data).toEqual({ token: 'sampleToken' });
  }, 10000); // Menambah batas waktu

  it('should log out successfully', async () => {
    const response = await request(app)
      .patch('/auth/logout/123');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Berhasil logout');
  }, 10000); // Menambah batas waktu

  it('should validate OTP successfully', async () => {
    const response = await request(app)
      .get('/auth/otp')
      .query({ otp: '123456' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('OTP berhasil divalidasi');
    expect(response.body.data).toEqual({ userId: 1 });
  }, 10000); // Menambah batas waktu
});