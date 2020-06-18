const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'You must supply an organization for a team!']
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'You must supply a name for a team!']
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'You must supply a name for a team!']
    },
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: { virtuals: true }
  }
);

teamSchema.virtual('employees', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'teamId'
});

teamSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'teams'
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
