import roomService from "../service/room-service.js";

const create = async (req, res, next) => {
    try {
        const { propId } = req.params;
        const result = await roomService.create({
            ...req.body,
            propertyId: propId,
        });

        return res.status(201).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const { propId, roomId } = req.params;
        const result = await roomService.update(req.body, propId, roomId);

        return res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default { create, update };
