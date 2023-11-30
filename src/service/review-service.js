import { validate } from "../validation/validation.js";
import { createReviewValidation } from "../validation/review-validation.js";
import { getPropertyValidation } from "../validation/property-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request, propId) => {
    const data = validate(createReviewValidation, request);
    propId = validate(getPropertyValidation, propId);

    const property = await prismaClient.property.findUnique({
        where: { id: propId },
    });

    if (!property) {
        throw new ResponseError(404, "property is not found");
    }

    const review = await prismaClient.review.create({
        data: {
            ...data,
            propertyId: property.id,
        },
    });

    const avgReviewRating = await prismaClient.review.aggregate({
        where: {
            propertyId: property.id,
        },
        _avg: {
            rating: true,
        },
    });

    await prismaClient.property.update({
        where: { id: property.id },
        data: {
            rating: avgReviewRating._avg.rating,
        },
    });

    return review;
};

export default { create };
