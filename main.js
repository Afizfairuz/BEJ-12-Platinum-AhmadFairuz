const express = require("express");
const path = require("path");
const app = express();
const PORT = 3883;

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk logging
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(logger);

// Middleware untuk menangani error internal server
const internalServerErrorHandler = (err, req, res, next) => {
  console.error("Internal server error:", err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
app.use(internalServerErrorHandler);

// Router Configuration
const router = express.Router();
const promoRouter = require('./src/router/promo')

// Use router
router.use('/promo', promoRouter)
app.use('/api', router)

// Inisialisasi repository
const UserRepository = require("./src/repository/UserRepository");
const ProductRepository = require("./src/repository/ProductRepository");
const CategoryRepository = require("./src/repository/CategoryRepository");
const OrderRepository = require("./src/repository/OrderRepository");
const ItemRepository = require("./src/repository/ItemRepository");

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();
const orderRepository = new OrderRepository();
const itemRepository = new ItemRepository();

// Inisialisasi service
const UserService = require("./src/service/userService");
const ProductService = require("./src/service/ProductService");
const CategoryService = require("./src/service/CategoryService");
const OrderService = require("./src/service/OrderService");
const ItemService = require("./src/service/ItemService");
const AuthService = require("./src/service/authService");

const userService = new UserService(userRepository);
const productService = new ProductService(productRepository, userRepository);
const categoryService = new CategoryService(categoryRepository);
const orderService = new OrderService(orderRepository);
const itemService = new ItemService(itemRepository);
const authService = new AuthService(userRepository);

// Inisialisasi handler
const UserHandler = require("./src/handler/userHandler");
const ProductHandler = require("./src/handler/ProductHandler");
const CategoryHandler = require("./src/handler/CategoryHandler");
const OrderHandler = require("./src/handler/OrderHandler");
const ItemHandler = require("./src/handler/ItemHandler");
const AuthHandler = require("./src/handler/authHandler");

const userHandler = new UserHandler(userService);
const productHandler = new ProductHandler(productService);
const categoryHandler = new CategoryHandler(categoryService);
const orderHandler = new OrderHandler(orderService);
const itemHandler = new ItemHandler(itemService);
const authHandler = new AuthHandler(authService);

// Route untuk User
app.get(
  "/users",
  authMiddleware.authenticate,
  authMiddleware.checkUserIsJavid,
  userHandler.getAllUsers
);
app.post("/users", (req, res) => userHandler.createUser(req, res));
app.get("/users/:email", (req, res) => userHandler.getUserByEmail(req, res));
app.put("/users/:id", (req, res) => userHandler.updateUser(req, res));
app.put("/users/:id/profilePicture", (req, res) =>
  userHandler.updateUserProfilePicture(req, res)
);
app.delete("/users/:id", (req, res) => userHandler.deleteUser(req, res));

// Route untuk Category
app.get("/categories", (req, res) => categoryHandler.getAll(req, res));
app.get("/categories/:id", (req, res) => categoryHandler.getById(req, res));
app.post("/categories", (req, res) => categoryHandler.create(req, res));
app.put("/categories/:id", (req, res) => categoryHandler.updateById(req, res));
app.delete("/categories/:id", (req, res) =>
  categoryHandler.deleteById(req, res)
);

// Route untuk Order
app.get("/orders", (req, res) => orderHandler.getAll(req, res));
app.get("/orders/:id", (req, res) => orderHandler.getById(req, res));
app.post("/orders", (req, res) => orderHandler.create(req, res));
app.put("/orders/:id", (req, res) => orderHandler.updateById(req, res));
app.delete("/orders/:id", (req, res) => orderHandler.deleteById(req, res));

// Route untuk Item
app.get("/items", (req, res) => itemHandler.getAll(req, res));
app.get("/items/:id", (req, res) => itemHandler.getById(req, res));
app.post("/items", (req, res) => itemHandler.create(req, res));
app.put("/items/:id", (req, res) => itemHandler.updateById(req, res));
app.delete("/items/:id", (req, res) => itemHandler.deleteById(req, res));

// Endpoint untuk menyajikan gambar
app.get("/images/binar.png", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "binar.png"));
});

// Endpoint Register
app.post("/auth/register", (req, res) => authHandler.register(req, res));
// Endpoint login
app.post("/auth/login", (req, res) => authHandler.login(req, res));

//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
