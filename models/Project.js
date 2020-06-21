const mongoose = require('mongoose');
const Task = require('./Task');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'You must supply a title!'],
    },
    description: {
      type: String,
      trim: true,
      minlength: [20, 'Minimum length for description is 20 characters!'],
      required: [true, 'You must supply a description!'],
    },
    state: {
      type: String,
      trim: true,
      enum: ['in-progress', 'in-review', 'done'],
      default: 'in-progress',
      required: [true, 'You must supply a state!'],
    },
    budget: {
      type: Number,
      required: [true, 'You must supply a budget!'],
    },
    deadLine: {
      type: Date,
      required: [true, 'You must supply a deadline for the project!'],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'You must supply an organization for a project!'],
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
  },
  { timestamps: { createdAt: 'startDate' } }
);

projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'projectId',
});

projectSchema.pre('remove', async function () {
  await Task.deleteMany({ projectId: this._id });
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
