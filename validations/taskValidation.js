const Joi = require('joi');

const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
  dueDate: Joi.date().optional(),
});

module.exports = { taskValidation };