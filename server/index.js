const express = require("express");
const app = express();
const controller = require("./controller");
const massive = require("massive");
require("dotenv").config();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("connected");
  })
  .catch(error => console.log(error));

app.use(express.json());

//CRUD AXIOS
app.get("/api/products", controller.getAll);
app.get("/api/products/:id", controller.getOne);
app.post("/api/products", controller.addOne);
app.delete("/api/products/:id", controller.delete);
app.put("/api/products/:id", controller.edit);

app.listen(SERVER_PORT, () => {
  console.log(`server listening on port ${SERVER_PORT}`);
});
