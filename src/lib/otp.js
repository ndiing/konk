const moment = require("moment");
const crypto = require("crypto");
const Crypto = require("./crypto");

const alg = { sha1: Buffer.alloc(20), sha256: Buffer.alloc(32), sha512: Buffer.alloc(64) };

function hotp(options = {}) {
    let { secret, counter = 0, algorithm = "sha1", digits = 6, encoding = "ascii" } = options;
    let keyBytes;
    if (encoding == "base32") {
        keyBytes = Crypto.base32Decode(secret);
    } else {
        keyBytes = Buffer.from(secret);
    }
    const counterBytes = Buffer.alloc(8);
    counterBytes.writeUInt32BE(counter, 4);
    const hash = crypto.createHmac(algorithm, keyBytes).update(counterBytes).digest("hex");
    const offset = parseInt(hash.charAt(hash.length - 1), 16);
    let result = parseInt(hash.substring(offset * 2, offset * 2 + 2 * 4), 16);
    result = result & 0x7fffffff;
    result = String(result).padStart(digits, "0");
    return result.slice(0 - digits);
}

function totp(options = {}) {
    const { secret, time, start = 0, period = 30, algorithm = "sha1", digits = 6, encoding = "ascii" } = options;
    const counter = Math.floor(((!time ? moment().unix() : time) - start) / period);
    return hotp({ secret, counter, algorithm, digits, encoding });
}

function otpauth(options = {}) {
    let { type = "totp", label = "user", secret, issuer = "Konek", algorithm = "sha1", digits = 6, counter = 0, period = 30 } = options;
    secret = crypto.randomBytes(64).toString("hex");
    secret = alg[algorithm].fill(secret);
    secret = Crypto.base32Encode(secret);
    const url = new URL("otpauth://" + type + "/" + label + "");
    url.searchParams.set("secret", secret);
    url.searchParams.set("issuer", issuer);
    url.searchParams.set("algorithm", algorithm);
    url.searchParams.set("digits", digits);
    if (type == "hotp") {
        url.searchParams.set("counter", counter);
    }
    if (type == "totp") {
        url.searchParams.set("period", period);
    }
    const chart = new URL("https://chart.googleapis.com/chart?cht=qr&chs=256x256&chl=");
    chart.searchParams.set("chl", url.toString());
    return { type, label, secret, issuer, algorithm, digits, counter, period, url: url.toString(), qr: chart.toString() };
}

module.exports = {
    hotp,
    totp,
    otpauth,
};

// var secret='secret'
// console.log(hotp({secret}))
// console.log(totp({secret}))
// console.log(otpauth({secret}))