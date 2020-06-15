const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'You must supply a name for organization!'],
    },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'You must supply an owner for organization!'],
    },
  },
  {
    timestamps: true,
  }
);

organizationSchema.virtual('teams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'organizationId',
});

organizationSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'organizationId',
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
