const Joi = require('joi');

exports.validateAdminLogin = (data) => {
    const schema = Joi.object({
      phone: Joi.string().required().messages({
        'string.empty': 'Phone number is required',
      }),
      password: Joi.string().required().messages({
        'string.min': 'Password must be at least 6 characters',
        'string.empty': 'Password is required',
      }),
    });

    return schema.validate(data, { abortEarly: false });
};
