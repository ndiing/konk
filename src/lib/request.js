const Headers = require("./headers");
const http = require("http");
const https = require("https");
const {Readable} = require("stream");

class Request {
    constructor(input = "", options = {}) {
        input = new URL(input, "http://localhost");

        this.protocol = input.protocol;
        this.origin = input.origin;
        this.client = this.protocol == "https:" ? https : http;
        this.hostname = input.hostname;
        this.port = parseInt(input.port || (this.protocol == "https:" ? 443 : 80));
        this.host = this.hostname;
        if (this.port !== 80 && this.port !== 443) {
            this.host += ":" + this.port;
        }
        input.pathname=options.path??input.pathname
        this.path = input.pathname + input.search + input.hash;
        this.agent = options.agent ?? new this.client.Agent({ keepAlive: true });
        this.insecureHTTPParser = options.insecureHTTPParser ?? true;
        this.timeout = options.timeout ?? 1000 * 60*60;

        this.body = options.body ?? "";

        if(!(this.body instanceof Readable)){
            const readable = new Readable()
            readable.push(this.body)
            readable.push(null)
            this.body=readable
        }

        // this.bodyUsed = options.bodyUsed;
        // this.cache = options.cache;
        this.credentials = options.credentials ?? "include";
        // this.destination = options.destination;
        this.headers = new Headers({
            Host: this.host,
            Connection: "keep-alive",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            ...options.headers,
        });
        // this.integrity = options.integrity;
        this.method = options.method ?? "GET";
        // this.mode = options.mode;
        this.redirect = options.redirect ?? "follow";
        this.follow = options.follow ?? 30;
        // this.referrer = options.referrer;
        // this.referrerPolicy = options.referrerPolicy;
        // this.signal = options.signal;
        this.url = input.toString();
    }
    
    arrayBuffer() {}

    blob() {}

    clone() {}

    formData() {}

    json() {}

    text() {}
}

module.exports = Request;

// var request = new Request();
// console.log(request);
