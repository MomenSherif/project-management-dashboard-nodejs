const path = require('path');
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const { validationErrorHandler, errorHandler } = require('./handlers/error');
const organizationRouter = require('./routers/organization');
const employeeRouter = require('./routers/employee');
const projectRouter = require('./routers/project');
const teamRouter = require('./routers/team');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(cors());

app.use('/organizations', organizationRouter);
app.use('/employees', employeeRouter);
app.use('/projects', projectRouter);
app.use('/teams', teamRouter);
app.use('/tasks', taskRouter);

app.use(validationErrorHandler);
app.use(errorHandler);

module.exports = app;
