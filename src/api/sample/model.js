const Helper = require("./helper");
const Database = require("../../lib/sqlite");
const config = require("../../lib/config");
const path = require("path");

const query = {};
query.table = `
CREATE TABLE IF NOT EXISTS sample (
    _id TEXT PRIMARY KEY,
    user TEXT,
    pass TEXT
)
`;
query.insert = `
INSERT INTO sample (_id, user, pass)
VALUES (?, ?, ?)
`;
query.select = `
SELECT * FROM sample
`;
query.update = `
UPDATE sample SET
    user = IFNULL(?, user),
    pass = IFNULL(?, pass)
WHERE _id = ?
`;
query.delete = `
DELETE FROM sample
WHERE _id = ?
`;

const db = new Database(path.join(config.path.data, "konk.db"));
db.serialize(() => db.run(query.table));

class Model {
    static async post(payload = {}) {
        try {
            const result = await db.run(query.insert, [payload._id, payload.user, payload.pass]);
            return { message: "OK" };
        } catch (error) {
            throw error;
        }
    }

    static async get(payload = {}) {
        try {
            const result = await db.all(query.select);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async patch(payload = {}) {
        try {
            const result = await db.run(query.update, [payload._id, payload.user, payload.pass]);
            return { message: "OK" };
        } catch (error) {
            throw error;
        }
    }

    static async delete(payload = {}) {
        try {
            const result = await db.run(query.delete, [payload._id]);
            return { message: "OK" };
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Model;
