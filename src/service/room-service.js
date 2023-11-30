import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getPropertyValidation } from "../validation/property-validation.js";
import {
    createRoomValidation,
    getRoomValidation,
    updateRoomValidation,
} from "../validation/room-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
    const room = validate(createRoomValidation, request);
    const propertyId = room.propertyId;

    const property = await prismaClient.property.findUnique({
        where: { id: propertyId },
    });

    if (!property) {
        throw new ResponseError(404, "property is not found");
    }

    return prismaClient.room.create({ data: room });
};

const update = async (request, propId, roomId) => {
    request = validate(updateRoomValidation, request);
    roomId = validate(getRoomValidation, roomId);
    propId = validate(getPropertyValidation, propId);

    const propertyInDatabase = await prismaClient.property.findUnique({
        where: { id: propId },
    });

    if (!propertyInDatabase) {
        throw new ResponseError(404, "property is not found");
    }

    const roomInDatabase = await prismaClient.room.findUnique({
        where: { id: roomId },
    });

    if (!roomInDatabase) {
        throw new ResponseError(404, "room is not found");
    }

    return prismaClient.room.update({
        where: { id: roomId },
        data: request,
    });
};

export default { create, update };
