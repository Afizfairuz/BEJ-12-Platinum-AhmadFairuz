const AuthService = require("../authService");
const UserRepository = require("../../repository/userRepository");
const MailRepository = require("../../repository/mailRepository")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


jest.mock('../../repository/userRepository');
jest.mock('../../repository/mailRepository');

// describe('AuthService.register', () => {
//   let authService;
//   let mockUserRepository;
//   let mockMailRepository;

//   beforeEach(() => {
//     // Mock untuk user repository
//     mockUserRepository = {
//       createUser: jest.fn(),
//       getUserByEmail: jest.fn(),
//       createOtp: jest.fn(),
//       deleteUser: jest.fn()
//     };

//     // Mock untuk mail repository
//     mockMailRepository = {
//       sendMail: jest.fn().mockResolvedValue(true) // Simulasikan berhasil mengirim email
//     };

//     authService = new AuthService(mockUserRepository, mockMailRepository);
//   });

//   it('berhasil: harus mengembalikan pengguna yang terdaftar', async () => {
//     const registerRequest = {
//       name: "javid",
//       email: "javid@gmail.com",
//       password: "123"
//     };

//     const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
//     const expectedRegisterResponse = {
//       statusCode: 201,
//       message: "berhasil melakukan register",
//       createdUser: {
//         id: 1,
//         name: "javid",
//         email: "javid@gmail.com",
//         password: hashedPassword,
//         updatedAt: expect.any(String),
//         createdAt: expect.any(String)
//       }
//     };

//     // Mocking fungsi getUserByEmail dari userRepository
//     mockUserRepository.getUserByEmail.mockResolvedValue(null); // Simulasikan tidak ada pengguna dengan email ini
//     mockUserRepository.createUser.mockResolvedValue({
//       ...expectedRegisterResponse.createdUser,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     });
//     mockUserRepository.createOtp.mockResolvedValue(); // Simulasikan OTP berhasil dibuat

//     const result = await authService.register(registerRequest);

//     expect(result.statusCode).toEqual(expectedRegisterResponse.statusCode);
//     expect(result.message).toEqual(expectedRegisterResponse.message);
//     expect(result.createdUser.id).toEqual(expectedRegisterResponse.createdUser.id);
//     expect(result.createdUser.email).toEqual(expectedRegisterResponse.createdUser.email);
//     expect(result.createdUser.password).toEqual(expectedRegisterResponse.createdUser.password);
//   });

//   it('gagal: harus menangani kasus pengguna sudah ada', async () => {
//     const registerRequest = {
//       name: "javid",
//       email: "javid@gmail.com",
//       password: "123"
//     };

//     // Mock untuk kasus pengguna sudah ada
//     const existingUser = {
//       id: 1,
//       name: "javid",
//       email: "javid@gmail.com",
//       password: "existingPasswordHash"
//     };

//     mockUserRepository.getUserByEmail.mockResolvedValue(existingUser); // Simulasikan pengguna sudah ada

//     const result = await authService.register(registerRequest);

//     expect(result.statusCode).toBe(400);
//     expect(result.message).toBe("Pengguna sudah ada");
//     // Pastikan bahwa fungsi createUser dan createOtp tidak dipanggil
//     expect(mockUserRepository.createUser).not.toHaveBeenCalled();
//     expect(mockUserRepository.createOtp).not.toHaveBeenCalled();
//     // Pastikan email tidak dikirim
//     expect(mockMailRepository.sendMail).not.toHaveBeenCalled();
//   });
// });




describe('AuthService.login', () => {
  let authService;
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      getUserByEmail: jest.fn(),
    };
    authService = new AuthService(mockUserRepository);
  });

  it('should return 200 and a token if login is successful', async () => {
    const loginRequest = { email: "javid@gmail.com", password: "123" };
    const mockUser = {
      email: "javid@gmail.com",
      password: bcrypt.hashSync("123", 10)
    };
    
    mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue("mockedToken");

    const expectedLoginResponse = {
      statusCode: 200,
      message: "Login berhasil",
      token: "mockedToken"
    };

    const loginUser = await authService.login(loginRequest);

    expect(loginUser.statusCode).toEqual(expectedLoginResponse.statusCode);
    expect(loginUser.message).toEqual(expectedLoginResponse.message);
    expect(loginUser.token).toEqual(expectedLoginResponse.token);
  });

  it('should return 404 if the user is not found', async () => {
    const loginRequest = { email: "javid@gmail.com", password: "123" };
    
    mockUserRepository.getUserByEmail.mockResolvedValue(null);

    const expectedLoginResponse = {
      message: "User not found"
    };

    const loginUser = await authService.login(loginRequest);

    expect(loginUser.message).toEqual(expectedLoginResponse.message);
  });

  it('should return 400 if the password is incorrect', async () => {
    const loginRequest = { email: "javid@gmail.com", password: "123" };
    const mockUser = {
      email: "javid@gmail.com",
      password: bcrypt.hashSync("wrongPassword", 10)
    };

    mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    const expectedLoginResponse = {
      statusCode: 400,
      message: "Login gagal",
      token: null
    };

    const loginUser = await authService.login(loginRequest);

    expect(loginUser.statusCode).toEqual(expectedLoginResponse.statusCode);
    expect(loginUser.message).toEqual(expectedLoginResponse.message);
    expect(loginUser.token).toBeNull();
  });

  it('should return 500 if an error occurs', async () => {
    const loginRequest = { email: "javid@gmail.com", password: "123" };

    mockUserRepository.getUserByEmail.mockRejectedValue(new Error("Database error"));

    const loginUser = await authService.login(loginRequest);

    expect(loginUser.statusCode).toEqual(500);
    expect(loginUser.message).toMatch(/Terjadi kesalahan/);
  });
});


// describe('AuthService.createToken', () => {
//   // Positive case
//   it('success: should create token and session', async () => {
//     // Create mock for user repository
//     // const mockUserRepository = new UserRepository();
//     const request = {
//       "token": "token",
//       "session": "session"
//     }

//     const expectedResponse = {
//       statusCode: 201,
//       message: "berhasil membuat token dan session",
//       data: data
//     }

//     mockUserRepository.createToken = jest.
//       fn().
//       mockImplementation(() => Promise.resolve(expectedResponse.data));

//     const authService = new AuthService(mockUserRepository);
//     const createToken = await authService.createToken(request);

//     expect(data.statusCode).toEqual(expectedResponse.statusCode);
//     expect(data.message).toEqual("berhasil membuat token dan session");
//     expect(data.createdUser.id).toEqual(expectedResponse.data);
//   });
// });


// describe('AuthService.logout', () => {
//   // Positive case
//   it('success: should update token and session to null', async () => {
//     // Create mock for user repository
//     // const mockUserRepository = new UserRepository();
//     const request = {
//       "token": "token",
//       "session": "session"
//     }

//     const expectedResponse = {
//       statusCode: 200,
//       message: "berhasil logout",
//       data: data
//     }

//     mockUserRepository.createToken = jest.
//       fn().
//       mockImplementation(() => Promise.resolve(expectedResponse.data));

//     const authService = new AuthService(mockUserRepository);
//     const createToken = await authService.createToken(request);

//     expect(data.statusCode).toEqual(expectedResponse.statusCode);
//     expect(data.message).toEqual("berhasil membuat token dan session");
//     expect(data.createdUser.id).toEqual(expectedResponse.data);
//   });
// });


// describe('AuthService.validateOtp', () => {
//   // Positive case
//   it('success: should validate otp user', async () => {
//     // Create mock for user repository
//     // const mockUserRepository = new UserRepository();
//     const request = {
//       "token": "token",
//       "session": "session"
//     }

//     const expectedResponse = {
//       statusCode: 201,
//       message: "berhasil membuat token dan session",
//       data: data
//     }

//     mockUserRepository.createToken = jest.
//       fn().
//       mockImplementation(() => Promise.resolve(expectedResponse.data));

//     const authService = new AuthService(mockUserRepository);
//     const createToken = await authService.createToken(request);

//     expect(data.statusCode).toEqual(expectedResponse.statusCode);
//     expect(data.message).toEqual("berhasil membuat token dan session");
//     expect(data.createdUser.id).toEqual(expectedResponse.data);
//   });
// });


describe('AuthService.createToken', () => {
  let mockUserRepository;
  let authService;

  beforeEach(() => {
    mockUserRepository = {
      createToken: jest.fn(),
    };
    authService = new AuthService(mockUserRepository);
  });

  it('success: should create token and session', async () => {
    const request = {
      id: 1,
      user: {
        token: "token",
        session: "session",
      },
    };

    const expectedResponse = {
      statusCode: 200,
      message: "berhasil membuat token dan session",
      data: request.user,
    };

    mockUserRepository.createToken.mockResolvedValue(expectedResponse.data);

    const response = await authService.createToken(request.id, request.user);

    expect(response.statusCode).toEqual(expectedResponse.statusCode);
    expect(response.message).toEqual(expectedResponse.message);
    expect(response.data).toEqual(expectedResponse.data);
  });
});

describe('AuthService.logout', () => {
  let mockUserRepository;
  let authService;

  beforeEach(() => {
    mockUserRepository = {
      deleteToken: jest.fn(),
    };
    authService = new AuthService(mockUserRepository);
  });

  it('success: should update token and session to null', async () => {
    const request = {
      id: 1,
    };

    const expectedResponse = {
      statusCode: 200,
      message: "berhasil logout",
    };

    mockUserRepository.deleteToken.mockResolvedValue(true);

    const response = await authService.logout(request.id);

    expect(response.statusCode).toEqual(expectedResponse.statusCode);
    expect(response.message).toEqual(expectedResponse.message);
  });
});

describe('AuthService.validateOtp', () => {
  let mockUserRepository;
  let authService;

  beforeEach(() => {
    mockUserRepository = {
      getUserByOtp: jest.fn(),
    };
    authService = new AuthService(mockUserRepository);
  });

  it('success: should validate otp user', async () => {
    const request = {
      otp: "123456",
    };

    const expectedResponse = {
      statusCode: 200,
      message: "berhasil mendapatkan data berdasarkan otp",
      data: { id: 1, otp: "123456" },
    };

    mockUserRepository.getUserByOtp.mockResolvedValue(expectedResponse.data);

    const response = await authService.validateOtp(request.otp);

    expect(response.statusCode).toEqual(expectedResponse.statusCode);
    expect(response.message).toEqual(expectedResponse.message);
    expect(response.data).toEqual(expectedResponse.data);
  });
});
