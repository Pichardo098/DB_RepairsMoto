const Repair = require("../models/repair.model");

//Get - Traer todas las reparaciones con status pending
exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: "pending",
      },
    });
    return res.status(200).json({
      status: "succes",
      message: "Repairs retrieved successfully",
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Post - Crear una cita, req.body(date,userId) El id es del usuario quien solicita la reparacion
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const repair = await Repair.create({
      date,
      userId,
    });
    return res.status(201).json({
      status: "success",
      message: "Repair created successfully",
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Obtener una cita pendiente por su id
exports.findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id ${id} not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Repair retrieved successfully",
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Actualizar reparacion cambiar status a completed
exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id ${id} not found`,
      });
    }
    const repairUpdate = await repair.update({
      status: "completed",
    });

    return res.status(200).json({
      status: "success",
      message: "Repair update successfully to completed",
      repairUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

//Cancelar reparacion (cambiar status a cancelled)
exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repairComplete = await Repair.findOne({
      where: {
        id,
        status: "completed",
      },
    });
    if (repairComplete) {
      return res.status(404).json({
        status: "error",
        message: `Repair ${id} with status "completed" cannot be canceled`,
      });
    }
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id ${id} not found`,
      });
    }

    const repairDelete = await repair.update({
      status: "cancelled",
    });

    return res.status(200).json({
      status: "succes",
      message: `Repair with id ${id} deleted successfully`,
      result: repairDelete,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
