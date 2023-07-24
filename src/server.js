const app = require("./app");
const { db } = require("./database/config");

db.authenticate()
  .then(() => console.log("Database connected.."))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Synchronized database.."))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
