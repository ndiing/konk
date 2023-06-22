const Model = require("./model");
const Subscriber = require("./subscriber");

class Controller {
    static async init(req, res, next) {
        try {
            const { _id = "default" } = req.query;
            res.locals.db = Model;
            res.locals.pool = Subscriber.get(_id, { _id });
            next();
        } catch (error) {
            next(error);
        }
    }

    static async post(req, res, next) {
        try {
            const payload = req.body;
            payload._id = payload._id ?? req.query._id;
            const result = await res.locals.db.post(payload);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async get(req, res, next) {
        try {
            const payload = {};
            payload._id = payload._id ?? req.query._id;
            const result = await res.locals.db.get(payload);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async patch(req, res, next) {
        try {
            const payload = req.body;
            payload._id = payload._id ?? req.query._id;
            const result = await res.locals.db.patch(payload);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const payload = {};
            payload._id = payload._id ?? req.query._id;
            const result = await res.locals.db.delete(payload);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = Controller;
