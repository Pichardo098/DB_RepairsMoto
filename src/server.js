require("dotenv").config();
const initModel = require("./models/initModels");
const app = require("./app");
const { db } = require("./database/config");

db.authenticate()
  .then(() => console.log("Database connected.."))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log("Synchronized database.."))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
