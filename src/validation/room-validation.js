import Joi from "joi";

const createRoomValidation = Joi.object({
    propertyId: Joi.number().positive().required(),
    image: Joi.string().required(),
    name: Joi.string().required().max(150),
    price: Joi.number().required(),
    maxPeople: Joi.number().required(),
    bedQty: Joi.number().required(),
    availableQty: Joi.number().required(),
});

const updateRoomValidation = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required().max(150),
    price: Joi.number().required(),
    maxPeople: Joi.number().required(),
    bedQty: Joi.number().required(),
    availableQty: Joi.number().required(),
});

const getRoomValidation = Joi.number().positive().required();

export { createRoomValidation, getRoomValidation, updateRoomValidation };
