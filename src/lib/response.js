const Headers = require("./headers");
const zlib = require("zlib");
const {Blob} = require("buffer");

class Response {
    constructor(body, options = {}) {
        // this.bodyUsed = options.bodyUsed;
        this.headers = new Headers(options.headers);
        // this.redirected = options.redirected;
        this.status = options.status || options.statusCode;
        this.statusText = options.statusText || options.statusMessage;
        this.ok = this.status >= 200 && this.status < 300;
        // this.type = options.type;
        this.url = options.url;
        this.body = body;

        if (this.headers.has("Content-Encoding")) {
            const ContentEncoding = this.headers.get("Content-Encoding");
            if (ContentEncoding.includes("gzip")) {
                this.body = this.body.pipe(zlib.createGunzip());
            } else if (ContentEncoding.includes("deflate")) {
                this.body = this.body.pipe(zlib.createInflate());
            } else if (ContentEncoding.includes("br")) {
                this.body = this.body.pipe(zlib.createBrotliDecompress());
            }
        }
    }
    
    static error() {}

    static json() {}

    static redirect() {}

    async buffer() {
        const buffer=[]
        for await (const chunk of this.body){
            buffer.push(chunk)
        }
        return Buffer.concat(buffer)
    }

    async arrayBuffer() {
        const buffer=await this.buffer()
        return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
    }

    async blob() {
        const buffer=await this.buffer()
        return new Blob([buffer])
    }

    async clone() {
        const buffer=await this.buffer()
        return buffer.copy()
    }

    async formData() {
    }

    async json() {
        const buffer=await this.buffer()
        return JSON.parse(buffer)
    }

    async text() {
        const buffer=await this.buffer()
        return buffer.toString()
    }
}

module.exports = Response;

// var response = new Response()
// console.log(response)