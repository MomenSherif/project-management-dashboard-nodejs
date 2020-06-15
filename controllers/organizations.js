const Organization = require('../models/Organization');
const Employee = require('../models/Employee');

const createOrganization = async (req, res) => {
  const { name, ...employee } = req.body;
  const organization = new Organization({ name });
  const businessOwner = new Employee(employee);
  businessOwner.organizationId = organization._id;
  organization.businessOwner = businessOwner._id;
  const [token] = await Promise.all([
    businessOwner.generateAuthToken(),
    businessOwner.save(),
    organization.save(),
  ]);
  res.status(201).json({ employee: businessOwner, token });
};

module.exports = {
  createOrganization,
};
