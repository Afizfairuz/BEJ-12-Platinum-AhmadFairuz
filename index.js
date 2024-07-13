const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const UserHandler = require('./src/handler/userhandler');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Route User
app.get('/users/:email', (req, res) => userHandler.getUserByEmail(req, res));
app.put('/users/:email', (req, res) => userHandler.updateUser(req, res));
app.delete('/users/:email', (req, res) => userHandler.deleteUser(req, res));
app.patch('/users/:email/profile-picture', (req, res) => userHandler.updateUserProfilePicture(req, res));


//Setup server
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});
