const http = require("http");
const { Readable } = require("stream");
const zlib = require("zlib");
const Headers = require("./headers");
const CookieStore = require("./cookie-store");

function error() {
    return (err, req, res, next) => {
        err = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        // console.log(err.stack);
        err.stack = undefined;
        if (res.statusCode >= 200 && res.statusCode < 300) {
            res.status(http.STATUS_CODES[err.code]?err.code:500);
        }
        res.json(err);
    };
}

function fallback() {
    return (req, res, next) => {
        res.status(404);
        next(new Error(http.STATUS_CODES[404]));
    };
}

function init() {
    return async (req, res, next) => {
        try {
            res.removeHeader("X-Powered-By");
            res.headers = new Headers({
                "Content-Security-Policy": "policy",
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY",
                "X-XSS-Protection": "1; mode=block",
                "Access-Control-Allow-Origin": "*",
            });
            res.send = (body = "") => {
                const readable = new Readable();
                readable.push(body);
                readable.push(null);
                body = readable;
                const acceptEncoding = req.headers["accept-encoding"];
                if (/\bgzip\b/.test(acceptEncoding)) {
                    res.headers.set("Content-Encoding", "gzip");
                    body = body.pipe(zlib.createGzip());
                } else if (/\bdeflate\b/.test(acceptEncoding)) {
                    res.headers.set("Content-Encoding", "deflate");
                    body = body.pipe(zlib.createDeflate());
                } else if (/\bbr\b/.test(acceptEncoding)) {
                    res.headers.set("Content-Encoding", "br");
                    body = body.pipe(zlib.createBrotliCompress());
                }
                res.writeHead(res.statusCode, res.headers);
                body.pipe(res);
            };

            res.cookie = (name, value) => {
                res.headers.append("Set-Cookie", CookieStore.serialize(name, value));
            };

            req.cookies = {};
            const cookie = req.headers["cookie"];
            if (cookie) {
                for (const [name, value] of cookie.matchAll(/([^=; ]+)=([^=;]+)?/g)) {
                    req.cookies[name] = value;
                }
            }

            if (["POST", "PATCH", "PUT"].includes(req.method)) {
                const buffer = [];
                for await (const chunk of req) {
                    buffer.push(chunk);
                }
                req.body = JSON.parse(Buffer.concat(buffer));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports={
    error,
    fallback,
    init,
}