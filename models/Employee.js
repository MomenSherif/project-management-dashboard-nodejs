const { promisify } = require('util');

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

const jwtSign = promisify(jwt.sign);

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'You must supply first name!'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'You must supply last name!'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'You must supply birth date!'],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(01)(0|2|1|5)[0-9]{8}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'You must supply a phone number!'],
    },
    salary: {
      type: Number,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'You must supply an organization for employee!'],
    },
    role: {
      type: String,
      enum: ['business-owner', 'team-leader', 'employee'],
      default: 'employee',
      required: [true, 'You must supply a role for employee!'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return emailRegExp.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'You must supply an email for employee!'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'You must supply a password for employee!'],
    },
  },
  { timestamps: true }
);

employeeSchema.plugin(uniqueValidator, {
  message: '{VALUE} is already in use',
});

// tasks
employeeSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'employeeId',
});

employeeSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 8);
});

employeeSchema.statics.findByCredentials = async ({ email, password }) => {
  // Find by email only beacuse indexing
  const employee = await Employee.findOne({ email });
  if (!employee) return null;

  const isMatch = await bcrypt.compare(password, employee.password);
  return isMatch ? employee : null;
};

employeeSchema.methods.generateAuthToken = function () {
  return jwtSign({ _id: this._id }, jwtSecretKey, { expiresIn: '36h' });
};

employeeSchema.methods.toJSON = function () {
  const employee = this.toObject();
  return { ...employee, password: undefined, __v: undefined };
};

const emailRegExp = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
