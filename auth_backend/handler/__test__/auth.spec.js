// const request = require('supertest');
// const app = require('../../app');
// const UserRepository = require('../../repository/userRepository');

// describe('register', () => {
//   let server;
//   const PORT = 2000;

//   const userRepository = new UserRepository();
//   const userToRegister = {
//     "name": "javid",
//     "email": "javid@gmail.com",
//     "password": "123"
//   }

//   beforeEach(() => {
//     server = app.listen(PORT, function () {
//       console.log(`Server berjalan pada http://localhost:${PORT}`);
//     });
//   });

//   afterEach(async () => {
//     // Cleanup data
//     await userRepository.deleteByEmail(userToRegister.email);

//     server.close()
//   });

//   // Positive case
//   it('success: should response with 201 and return the registered user', async () => {
//     return request(app)
//       .post('/api/auth/register')
//       .set('Content-type', 'application/json')
//       .send(userToRegister)
//       .then(async (res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.created_user.email).toEqual(userToRegister.email);
//       });
//   });

//   // Negative case
//   it('success: should response with 400 and return the error message', async () => {
//     const userToRegister = {
//       "name": "javid",
//       "email": "javid@gmail.com",
//       "password": "adhi123"
//     }

//     // Create duplicate data
//     await userRepository.insert(userToRegister);

//     return request(app)
//       .post('/api/auth/register')
//       .set('Content-type', 'application/json')
//       .set('Authorization', 'Bearer + token')
//       .send(userToRegister)
//       .then(async (res) => {
//         expect(res.statusCode).toEqual(500);
//         expect(res.body.message[0].message).toEqual("email must be unique");
//       });
//   });
// });