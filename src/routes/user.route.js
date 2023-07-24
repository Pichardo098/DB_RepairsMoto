const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
//Get_ todos los usuarios
//Post - Crear un nuevo usuario

router
  .route("/")
  .get(userController.findAllUsers)
  .post(userController.createUser);

//Get - Obtener solo un usuario
//Patch- Actualizar Solo name y email
//Delete -Deshabilitar la cuenta

router
  .route("/:id")
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
