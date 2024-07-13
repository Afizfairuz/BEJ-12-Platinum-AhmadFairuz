const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const userHandler = require('./src/handler/userhandler');
const itemHandler = require('./src/handler/itemhandler');
const orderHandler = require('./src/handler/orderhandler');
const promoHandler = require('./src/handler/promohandler');
const paymentHandler = require('./src/handler/paymenthandler');

const app = express();
app.use(express.json());

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route User
app.get('/users/:email', (req, res) => userHandler.getUserByEmail(req, res));
app.put('/users/:email', (req, res) => userHandler.updateUser(req, res));
app.delete('/users/:email', (req, res) => userHandler.deleteUser(req, res));
app.patch('/users/:email/profile-picture', (req, res) => userHandler.updateUserProfilePicture(req, res));

// Route Item
app.get('/items', (req, res) => itemHandler.getAllItems(req, res));
app.get('/items/:id', (req, res) => itemHandler.getItemById(req, res));
app.put('/items/:id', (req, res) => itemHandler.updateItem(req, res));
app.delete('/items/:id', (req, res) => itemHandler.deleteItem(req, res));
app.patch('/items/:id/media', (req, res) => itemHandler.uploadMedia(req, res));

// Route Order
app.post('/orders', (req, res) => orderHandler.createOrder(req, res));
app.get('/orders', (req, res) => orderHandler.getAllOrders(req, res));
app.put('/orders/:id', (req, res) => orderHandler.updateOrder(req, res));
app.delete('/orders/:id', (req, res) => orderHandler.deleteOrder(req, res));

// Route Promo
app.get('/promos', (req, res) => promoHandler.getAllPromos(req, res));
app.get('/promos/eligible', (req, res) => promoHandler.getEligiblePromos(req, res));
app.post('/promos', (req, res) => promoHandler.createPromo(req, res));
app.put('/promos/:promoId', (req, res) => promoHandler.updatePromo(req, res));
app.delete('/promos/:promoId', (req, res) => promoHandler.deletePromo(req, res));

// Route Payment
app.get('/payments', (req, res) => paymentHandler.getAllPayments(req, res));
app.get('/payments/:paymentId', (req, res) => paymentHandler.getPaymentById(req, res));
app.post('/payments', (req, res) => paymentHandler.createPayment(req, res));
app.put('/payments/:paymentId', (req, res) => paymentHandler.updatePayment(req, res));
app.delete('/payments/:paymentId', (req, res) => paymentHandler.deletePayment(req, res));

// Setup server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});
