import Joi from "joi";

const createReviewValidation = Joi.object({
    userId: Joi.number().positive().required(),
    body: Joi.string().required(),
    rating: Joi.number().positive().optional(),
});

export { createReviewValidation };
