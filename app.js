//import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
//import destructuring jsons
const { json, urlencoded } = express;
const bodyParser = require("body-parser");
//import for auth
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

//res and req sanitazier

//app
const app = express();

//app use json destricturing crud
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);
//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to DB"));

//middleware
app.use(morgan("dev"));
var corsOptions = {
  // "http://localhost:8000",https://ebis.onrender.com
  origin: "https://ebis.onrender.com", //to the client side connection
  methods: ["GET", "POST"],
  credentials: true,
  preflightContinue: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};
app.use(cors(corsOptions));

//hasing and parsing
app.use(cookieParser());
app.use(expressValidator());

//routes test
const testRoutes = require("./routes/test");
app.use("/", testRoutes);

//user routes start /user
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

//citizen routes start
const citizenRoutes = require("./routes/Citizen");
app.use("/api", citizenRoutes);

//lupon routes start
const luponRoutes = require("./routes/Lupon");
app.use("/lupon", luponRoutes);

//member routes start
const memberRoutes = require("./routes/Member");
app.use("/member", memberRoutes);

//report routes start
const reportRoutes = require("./routes/reports");
app.use("/report", reportRoutes);

//location routes start
const locationRoutes = require("./routes/locations");
app.use("/location", locationRoutes);

//port
const port = process.env.PORT;

//listener
const server = app.listen(port, () =>
  console.log(`Server is running at ${port}`)
);
