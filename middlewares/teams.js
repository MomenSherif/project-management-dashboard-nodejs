const CustomError = require('../helper/CustomError');
const Team = require('../models/Team');

const validateTeamOwner = async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) throw new CustomError(404, 'Not Team Project!');

  if (!team.organizationId.equals(req.employee.organizationId))
    throw new CustomError(403, 'Not Authorized!');

  req.team = team;
  next();
};

module.exports = {
  validateTeamOwner
};
