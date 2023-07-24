const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//Routes-rutas
const userRoute = require("./routes/user.route");
const repairRoute = require("./routes/repair.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/repairs", repairRoute);

module.exports = app;
