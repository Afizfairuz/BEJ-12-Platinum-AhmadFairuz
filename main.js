const express = require("express");
const path = require("path");
const session = require("express-session");
const redisClient = require("./auth_backend/config/redis");
const morgan = require("morgan");
const multer = require("multer");
const app = express();
const upload = require('./utils/uploadStorage');
const uploadCloudinary = require('./utils/uploadCloudinary');
const cloudinary = require('./config/config')
const redisClient = require('./config/redis')
const PORT = 8000;

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Middleware untuk logging
// const logger = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };
// app.use(logger);

// Middleware untuk menangani error internal server
const internalServerErrorHandler = (err, req, res, next) => {
  console.error("Internal server error:", err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
app.use(internalServerErrorHandler);

// session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);
// Router Configuration
const router = express.Router();
const promoRouter = require("./auth_backend/router/promo");

// Use router
router.use("/promo", promoRouter);
app.use("/api", router);

// Inisialisasi repository
const UserRepository = require("./auth_backend/repository/userRepository");
const ProductRepository = require("./auth_backend/repository/productRepository");
const CategoryRepository = require("./auth_backend/repository/categoryRepository");
const OrderRepository = require("./auth_backend/repository/OrderRepository");
const ItemRepository = require("./auth_backend/repository/ItemRepository");
const PaymentRepository = require("./auth_backend/repository/paymentRepository");

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();
const orderRepository = new OrderRepository();
const itemRepository = new ItemRepository();
const paymentRepository = new PaymentRepository();

// Inisialisasi service
const UserService = require("./auth_backend/service/userService");
const ProductService = require("./auth_backend/service/productService");
const CategoryService = require("./auth_backend/service/categoryService");
const OrderService = require("./auth_backend/service/orderService");
const ItemService = require("./auth_backend/service/itemService");
const PaymentService = require("./auth_backend/service/paymentService");
const AuthService = require("./auth_backend/service/authService");

const userService = new UserService(userRepository);
const productService = new ProductService(productRepository, userRepository);
const categoryService = new CategoryService(categoryRepository);
const orderService = new OrderService(orderRepository);
const itemService = new ItemService(itemRepository);
const paymentService = new PaymentService(paymentRepository);
const authService = new AuthService(userRepository);

// Inisialisasi handler
const UserHandler = require("./auth_backend/handler/userHandler");
const ProductHandler = require("./auth_backend/handler/productHandler");
const CategoryHandler = require("./auth_backend/handler/categoryHandler");
const OrderHandler = require("./auth_backend/handler/orderHandler");
const ItemHandler = require("./auth_backend/handler/itemHandler");
const PaymentHandler = require("./auth_backend/handler/paymentHandler");
const AuthHandler = require("./auth_backend/handler/authHandler");

const userHandler = new UserHandler(userService);
const productHandler = new ProductHandler(productService);
const categoryHandler = new CategoryHandler(categoryService);
const orderHandler = new OrderHandler(orderService);
const itemHandler = new ItemHandler(itemService);
const paymentHandler = new PaymentHandler(paymentService);
const authHandler = new AuthHandler(authService);

const authMiddleware = require("./auth_backend/middleware/auth");

// Route untuk User
app.get(
  "/users",
  authMiddleware.authenticate,
  authMiddleware.checkUserIsAdmin,
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

// Route untuk Payment
app.get("/payments", (req, res) => paymentHandler.getAll(req, res));
app.get("/payments/:id", (req, res) => paymentHandler.getById(req, res));
app.post("/payments", (req, res) => paymentHandler.create(req, res));
app.put("/payments/:id", (req, res) => paymentHandler.updateById(req, res));
app.delete("/payments/:id", (req, res) => paymentHandler.deleteById(req, res));

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

// route untuk auth
app.post("/auth/register", (req, res) => authHandler.register(req, res));
app.post("/auth/login", (req, res) => authHandler.login(req, res));
app.patch("/auth/token/:id", (req, res) => authHandler.createToken(req, res));
app.get("/auth/token/:id", (req, res) => authHandler.getUserById(req, res));
app.patch("/auth/logout/:id", (req, res) => authHandler.logout(req, res));

// Redis
app.post("/auth/redis", async (req, res) => {
  const token = req.body.token;
  const session = req.body.session;
  const userId = req.body.userId;
  const dataToSave = {
    token: token,
    session: session,
    userId: userId,
  };
  await redisClient.connect();
  await redisClient.set("user-", JSON.stringify(dataToSave));
  await redisClient.disconnect();

  res.send("success");
});
app.get("/auth/redis/", async (req, res) => {
const userId = req.params.userId;

  await redisClient.connect();
  const data = await redisClient.get(userId);
  await redisClient.disconnect();

  res.send({
    message: "success",
    data: data,
  });
});

app.delete("/auth/redis/logout", async (req, res) => {
  const userId = req.params.userId;

  await redisClient.connect();
  const data = await redisClient.delete(userId);
  await redisClient.disconnect();

  res.send({
    message: "success to delete",
    data: data,
  });
});

// Endpoint Upload Storage & Cloudinary
app.post("/files/storage/upload", upload.single("image"), (req, res) => {
  res.send("success");
});

app.post(
  "/files/cloudinary/upload",
  uploadCloudinary.single("image"),
  async (req, res) => {
    // TODO: upload to cloudinary storage
    try {
      const fileBuffer = req.file?.buffer.toString("base64");
      const fileString = `data:${req.file?.mimetype};base64,${fileBuffer}`;

      const uploadedFile = await cloudinary.uploader.upload(fileString);

      return res.status(201).send({
        message: "succes",
        image: uploadedFile.secure_url,
      });
    } catch (error) {
      return res.status(400).send({
        message: error,
      });
    }
  }
);

app.post('/redis', async (req, res) => {
  const token = req.body.token;
  const userId = req.body.userId;
  const dataToSave = {
    tokens: "token",
    userIds: "userId"
  }
  await redisClient.connect();
  await redisClient.set("user-2", JSON.stringify(dataToSave));
  await redisClient.disconnect();

  res.send("success");
})

app.get('/redis', async (req, res) => {
  await redisClient.connect();
  const token = await redisClient.get("user-2");
  await redisClient.disconnect();

  res.send({
    "message": "success",
    "data": token
  });
})

//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
    