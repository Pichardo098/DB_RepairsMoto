const { Repair, repairStatus } = require("../models/repair.model");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");

exports.validRepair = async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      [Op.or]: [
        { status: repairStatus.pending },
        { status: repairStatus.completed },
      ],
    },
  });

  if (!repair) {
    return next(new AppError(`Repair with id ${id} not found`, 404));
  }

  req.repair = repair;
  next();
};
