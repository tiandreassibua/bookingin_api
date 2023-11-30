import Joi from "joi";

const createPropertyValidation = Joi.object({
    name: Joi.string().max(150).required(),
    address: Joi.string().max(150).required(),
    city: Joi.string().max(50).required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    category: Joi.string().required(),
});

const getPropertyValidation = Joi.number().positive().required();

export { createPropertyValidation, getPropertyValidation };
