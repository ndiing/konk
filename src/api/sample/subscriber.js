const Service = require("./service");
const EventEmitter = require("events");

const subscriber = new EventEmitter();
subscriber.setMaxListeners(0);

const pools = {};

function get(name, options) {
    if (!pools[name]) {
        if (!options) {
            const error = new Error("Service Unavailable");
            error.code = 503;
            throw error;
        }
        const pool = new Service(options);
        const logout = pool.logout;
        pool.logout = (...args) => {
            delete pools[name];
            return logout(...args);
        };

        // pool.login()

        pools[name] = pool;
    }
    return pools[name];
}

subscriber.pools = pools;
subscriber.get = get;

module.exports = subscriber;
