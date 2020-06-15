const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
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
      enum: ['in-progress', 'done', 'overdue'],
      default: 'in-progress',
      required: [true, 'You must supply a state!'],
    },
    deadLine: {
      type: Date,
      required: [true, 'You must supply a deadline for the task!'],
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'You must supply an employee!'],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'You must supply a project!'],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'You must supply an organization!'],
    },
  },
  { timestamps: { createdAt: 'startDate' } }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
