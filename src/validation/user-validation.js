import Joi from "joi";

const registerUserValidation = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    phone: Joi.string().max(30).required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().max(200).required(),
    isAdmin: Joi.boolean().optional().default(false),
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(50).required(),
    password: Joi.string().min(6).required(),
});

const updateUserValidation = Joi.object({
    id: Joi.number().positive().required(),
    firstName: Joi.string().max(50).optional(),
    lastName: Joi.string().max(50).optional(),
    password: Joi.string().max(200).optional(),
    phone: Joi.string().max(30).optional(),
    email: Joi.string().max(50).optional(),
});

const getUserValidation = Joi.number().positive().required();

export {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
};
