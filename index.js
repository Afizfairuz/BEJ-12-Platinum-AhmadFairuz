const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const UserHandler = require('./src/handler/userhandler');
const itemHandler = require('./src/handler/itemhandler');
const orderHandler = require('./src/handler/orderhandler');


const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Route User
app.get('/users/:email', (req, res) => userHandler.getUserByEmail(req, res));
app.put('/users/:email', (req, res) => userHandler.updateUser(req, res));
app.delete('/users/:email', (req, res) => userHandler.deleteUser(req, res));
app.patch('/users/:email/profile-picture', (req, res) => userHandler.updateUserProfilePicture(req, res));

//Route Item
app.get('/items', (req, res) => itemHandler.getAllItems(req, res));
app.get('/items/:id', (req, res) => itemHandler.getItemById(req, res));
app.put('/items/:id', (req, res) => itemHandler.updateItem(req, res));
app.delete('/items/:id', (req, res) => itemHandler.deleteItem(req, res));
app.patch('/items/:id/media', (req, res) => itemHandler.uploadMedia(req, res));

//Route Order
app.post('/api/orders', (req, res) => orderHandler.createOrder(req, res));
app.get('/api/orders', (req, res) => orderHandler.getAllOrders(req, res));
app.put('/api/orders/:id', (req, res) => orderHandler.updateOrder(req, res));
app.delete('/api/orders/:id', (req, res) => orderHandler.deleteOrder(req, res));



//Setup server
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});
