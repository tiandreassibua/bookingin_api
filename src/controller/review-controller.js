import reviewService from "../service/review-service.js";

const create = async (req, res, next) => {
    try {
        const request = { ...req.body, userId: req.user.id };
        const propId = req.params.propId;

        const result = await reviewService.create(request, propId);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default { create };
