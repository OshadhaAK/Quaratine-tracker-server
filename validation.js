const Joi = require('@hapi/joi');

const registerValidation = data => {
    const Schema = Joi.object({
        name: Joi.string().min(6).required(),
        emailaddress:Joi.string().min(6).required().email(),
        password:Joi.string().min(3).required(),
        regNo:Joi.string().min(3).required()
    });
    return Schema.validate(data);
};

const loginValidation = data => {
    const Schema = Joi.object({
        emailaddress:Joi.string().min(3).required().email(),
        password:Joi.string().min(3).required()
    });
    return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;