import propertyService from "../service/property-service.js";

const index = async (req, res, next) => {
    try {
        const result = await propertyService.index();
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const result = await propertyService.show(slug);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await propertyService.create(req.body);
        res.status(201).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const request = req.body;
        const { id } = req.params;
        const result = await propertyService.update(id, request);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await propertyService.remove(id);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default { index, create, update, remove, show };
