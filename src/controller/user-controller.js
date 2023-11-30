import userService from "../service/user-service.js";

const get = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const result = await userService.get(userId);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const request = req.body;
        request.id = req.params.id;

        const result = await userService.update(request);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await userService.remove(req.params.id);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const index = async (req, res, next) => {
    try {
        const result = await userService.index();
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default { get, update, index, remove };
