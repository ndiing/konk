const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const sqlite = require("sqlite3").verbose();

function Database(filename) {
    const dirname = path.dirname(filename);
    try {
        fs.readFileSync(dirname);
    } catch (error) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    
    this.db = new sqlite.Database(filename);
    for (const name in Object.getPrototypeOf(this.db)) {
        if (typeof this.db[name] == "function") {
            this.db[name] = promisify(this.db[name]);
        }
    }
    return this.db;
}

module.exports = Database;
