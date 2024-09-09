const Joi = require('joi');

// Define the validation schema
const addCourseScheme = Joi.object({
  // Code needs to start with an alphabet and end with a number
  code: Joi.string()
    .uppercase()
    .pattern(/^[a-zA-Z]+[0-9]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid code format',
    }),
  name: Joi.string().min(1).max(30).required(),
  description: Joi.string().optional(),
});

// Export the schema
module.exports = addCourseScheme;
