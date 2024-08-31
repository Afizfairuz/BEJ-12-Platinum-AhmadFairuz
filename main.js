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
const MailRepository = require("./auth_backend/repository/mailRepository");

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();
const orderRepository = new OrderRepository();
const itemRepository = new ItemRepository();
const paymentRepository = new PaymentRepository();
const mailRepository = new MailRepository();

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
const authService = new AuthService(userRepository, mailRepository);

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
app.patch("/auth/logout/:id", (req, res) => authHandler.logout(req, res));
app.get("/auth/otp", (req, res) => authHandler.validateOtp(req, res));

// Redis untuk auth
app.post("/auth/token", async (req, res) => {
  const { token, session, userId } = req.body;
  const dataToSave = {
    token: token,
    session: session,
    userId: userId,
  };

  try {
    await redisClient.connect();
    await redisClient.set(`user-${userId}`, JSON.stringify(dataToSave));
    res.send("success menyimpan token");
  } catch (error) {
    res.status(500).send("terjadi kesalahan:", error);
  } finally {
    await redisClient.disconnect();
  }
});

app.get("/auth/token/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    await redisClient.connect();
    const data = await redisClient.get(`user-${userId}`);

    if (data) {
      res.status(200).send({
        message: "success mendapatkan data",
        data: data,
      });
    } else {
      res.status(400).send({
        message: "data tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).send("terjadi kesalahan:", error);
  } finally {
    await redisClient.disconnect();
  }
});

app.delete("/auth/token/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    await redisClient.connect();
    const data = await redisClient.get(`user-${userId}`);

    if (data) {
      await redisClient.del(`user-${userId}`);

      res.status(200).send({
        message: "success to logout",
        data: data,
      });
    } else {
      res.status(400).send({
        message: "gagal logout",
      });
    }
  } catch (error) {
    res.status(500).send("terjadi kesalahan:", error);
  } finally {
    await redisClient.disconnect();
  }
});

app.post("/auth/otp", async (req, res) => {
  const { otp, userId } = req.body;
  const dataToSave = {
    otp: otp,
    userId: userId,
  };

  try {
    await redisClient.connect();
    await redisClient.set(`user-${userId}`, JSON.stringify(dataToSave));
    res.send("success menyimpan otp");
  } catch (error) {
    res.status(500).send("terjadi kesalahan:", error);
  } finally {
    await redisClient.disconnect();
  }
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

app.post("/redis", async (req, res) => {
  const token = req.body.token;
  const userId = req.body.userId;
  const dataToSave = {
    tokens: "token",
    userIds: "userId",
  };
  await redisClient.connect();
  await redisClient.set("user-2", JSON.stringify(dataToSave));
  await redisClient.disconnect();

  res.send("success");
});

app.get("/auth/otp", async (req, res) => {
  try {
    const { otp } = req.body;

    await redisClient.connect();
    const data = await redisClient.get(`user-${otp}`);

    if (data) {
      res.status(200).send({
        message: "success mendapatkan data",
        data: data,
      });
    } else {
      res.status(400).send({
        message: "data tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).send("terjadi kesalahan:", error);
  } finally {
    await redisClient.disconnect();
  }
});

// Endpoint Upload Storage & Cloudinary
app.post("/files/storage/upload", upload.single("image"), (req, res) => {
  res.send("success");
});

app.get("/redis", async (req, res) => {
  await redisClient.connect();
  const token = await redisClient.get("user-2");
  await redisClient.disconnect();

  res.send({
    message: "success",
    data: token,
  });
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

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
