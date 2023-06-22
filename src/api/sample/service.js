const Helper = require("./helper");
const fetch = require("../../lib/fetch");
const Storage = require("../../lib/storage");
const config = require("../../lib/config");
const path = require("path");
const EventEmitter = require("events");

class Service extends EventEmitter {
    constructor(options = {}) {
        super();
        this.setMaxListeners(0);
        const { _id = "default" } = options;
        this.storage = new Storage(path.join(config.path.data, "sample", _id + ".json.gz"), {});
    }

    fetch(resource, options = {}) {
        return fetch(resource, {
            storage: this.storage,
            ...options,
            headers: {
                ...options.headers,
            },
        });
    }
}
module.exports = Service;

// var service=new Service()
// service.fetch('http://example.com')
// .then(res=>res.text())
// .then(console.log)
// .catch(console.log)
