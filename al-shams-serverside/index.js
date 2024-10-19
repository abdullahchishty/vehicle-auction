const express = require("express");
require("./src/config/config");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
// const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const uploadMiddleware = require('./src/middlewares/categoryUploadMiddleware');
const makeLogoUpload = require('./src/middlewares/makeLogoUploadMiddleware');
const vehicleUploadMiddleware = require('./src/middlewares/vehicleUploadMiddleware');
const vehicleInventory = require('./src/controllers/inventoryVehicleControllers/inventoryVehicle');
const category = require('./src/controllers/categoryControllers/category');
const authenticateJWT = require('./src/middlewares/authenticateJWT');
const checkRole = require('./src/middlewares/checkRole');
const makes = require('./src/controllers/vehicleMakeControllers/vehicleMake');
const makeMulterRoute = require('./src/routes/vehicleMakeRoutes/multerRoute');
const categoryMulterRoute = require('./src/routes/categoryRoutes/multerRoute');
const vehicleInventoryMulterRoute = require('./src/routes/inventorVehicleRoutes/multerRoute');
const createSuperAdmin = require('./src/controllers/adminControllers/createSuperUser');

app.use(
  cors({
    origin: process.env.FRONTEND_DEV_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
// dotenv.config();

const userRouter = require("./src/routes/userRoutes/userApi");
const adminRouter = require("./src/routes/adminRoutes/userRoute")
const categoryRouter = require("./src/routes/categoryRoutes/categoryRoute");
const vehicle = require("./src/routes/inventorVehicleRoutes/inventoryVehicleRoute");
const make = require("./src/routes/vehicleMakeRoutes/vehicleMakeRoute");
const model = require("./src/routes/vehicleModelRoutes/vehicleModelRoute");
const attribute = require("./src/routes/vehicleAttributeRoutes/vehicleAttributeRoute")

createSuperAdmin.createSuperUser();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes which handle requests with multer
app.use("/vehicle", makeMulterRoute);
app.use("/category", categoryMulterRoute);
app.use("/vehicle", vehicleInventoryMulterRoute);

const upload = multer();

app.use(upload.none());

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(cookieParser());
app.use("/customer", userRouter);
app.use("/user", adminRouter);
app.use("/category", categoryRouter);
app.use("/vehicle", vehicle);
app.use("/vehicle", make);
app.use("/vehicle", model);
app.use("/vehicle", attribute);

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port, ip, () => console.log(`Server is running ${ip}:${port}`));

