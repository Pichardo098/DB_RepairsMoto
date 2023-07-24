const User = require("../models/user.model");

//Traer todos los usuarios Get
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "available",
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Post - Crear nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // const { id } = req.params;
    const { name, email, password, role } = req.body;

    //Verificación por id y email
    const existsUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existsUser) {
      return res.status(404).json({
        status: "fail",
        message: `User with email ${email} already exists`,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Traer un solo usuario GET
exports.findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${id} not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User retrieved succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Actualizar usuario POST
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${id} not found`,
      });
    }

    const userUpdate = await user.update({
      name,
      email,
    });
    return res.status(200).json({
      status: "success",
      message: "User update successfully",
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Eliminar un usuario DELETE
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${id} not found`,
      });
    }

    const userDelete = await user.update({
      status: "unavailable",
    });

    return res.status(200).json({
      status: "success",
      message: `User with id ${id} deleted successfully`,
      result: userDelete,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
