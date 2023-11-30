import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createSlug } from "../utils/generateSlug.js";
import {
    createPropertyValidation,
    getPropertyValidation,
} from "../validation/property-validation.js";
import { validate } from "../validation/validation.js";

const index = async () => {
    return prismaClient.property.findMany();
};

const show = async (slug) => {
    const property = await prismaClient.property.findUnique({
        where: { slug },
        include: {
            rooms: {
                where: {
                    availableQty: {
                        gte: 1,
                    },
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    price: true,
                    maxPeople: true,
                    bedQty: true,
                    availableQty: true,
                },
            },
            review: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                    body: true,
                    rating: true,
                    createdAt: true,
                },
            },
            _count: {
                select: {
                    rooms: {
                        where: {
                            availableQty: {
                                gte: 1,
                            },
                        },
                    },
                },
            },
        },
    });

    if (!property) {
        throw new ResponseError(404, "property is not found");
    }

    return property;
};

const create = async (request) => {
    const property = validate(createPropertyValidation, request);
    property.slug = await createSlug(property.name);
    property.location = property.location.split("src=")[1].split('"')[1];

    return prismaClient.property.create({ data: property });
};

const update = async (propId, request) => {
    const property = validate(createPropertyValidation, request);
    const id = validate(getPropertyValidation, propId);

    property.slug = await createSlug(property.name);
    property.location = property.location.split("src=")[1].split('"')[1];

    return prismaClient.property.update({
        where: { id },
        data: property,
    });
};

const remove = async (propId) => {
    const id = validate(getPropertyValidation, propId);

    const property = await prismaClient.property.findUnique({
        where: { id },
    });

    if (!property) {
        throw new ResponseError(404, "property is not found");
    }

    return prismaClient.property.delete({ where: { id } });
};

export default { index, create, update, remove, show };
