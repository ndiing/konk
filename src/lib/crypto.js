const crypto = require("crypto");

function base64Encode(data, options = {}) {
    const {} = options;
    return Buffer.from(data).toString("base64");
}

function base64Decode(data, options = {}) {
    const {} = options;
    return Buffer.from(data, "base64").toString();
}

function base64urlEncode(data, options = {}) {
    const {} = options;
    return Buffer.from(data).toString("base64url");
}

function base64urlDecode(data, options = {}) {
    const {} = options;
    return Buffer.from(data, "base64url").toString();
}

function base32Encode(data, options = {}) {
    const {} = options;
    data = Buffer.from(data);
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let defaultPadding = true;
    const padding = defaultPadding;
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    let bits = 0;
    let value = 0;
    let output = "";
    for (let i = 0; i < view.byteLength; i++) {
        value = (value << 8) | view.getUint8(i);
        bits += 8;
        while (bits >= 5) {
            output += alphabet[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += alphabet[(value << (5 - bits)) & 31];
    }
    if (padding) {
        while (output.length % 8 !== 0) {
            output += "=";
        }
    }
    return output.replace(/\=+$/, "");
}

function base32Decode(data, options = {}) {
    const {} = options;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    data = String(data).replace(/=+$/, "");
    const length = data.length;
    let bits = 0;
    let value = 0;
    let index = 0;
    let output = new Uint8Array(((length * 5) / 8) | 0);
    for (let i = 0; i < length; i++) {
        const char = data[i];
        value = (value << 5) | alphabet.indexOf(char);
        bits += 5;
        if (bits >= 8) {
            output[index++] = (value >>> (bits - 8)) & 255;
            bits -= 8;
        }
    }
    return Buffer.from(output.buffer).toString();
}

function encrypt(data, options = {}) {
    const { algorithm = "aes-256-cbc", key = Buffer.alloc(32), iv = Buffer.alloc(16), encoding = "hex" } = options;
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return Buffer.concat([cipher.update(data), cipher.final()]).toString(encoding);
}

function decrypt(data, options = {}) {
    const { algorithm = "aes-256-cbc", key = Buffer.alloc(32), iv = Buffer.alloc(16), encoding = "hex" } = options;
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    return Buffer.concat([cipher.update(data, encoding), cipher.final()]).toString();
}

function privateEncrypt(data, options = {}) {
    const { key, encoding = "hex" } = options;
    return crypto.privateEncrypt(key, Buffer.from(data)).toString(encoding);
}

function publicDecrypt(data, options = {}) {
    const { key, encoding = "hex" } = options;
    return crypto.publicDecrypt(key, Buffer.from(data, encoding)).toString();
}

function publicEncrypt(data, options = {}) {
    const { key, encoding = "hex" } = options;
    return crypto.publicEncrypt(key, Buffer.from(data)).toString(encoding);
}

function privateDecrypt(data, options = {}) {
    const { key, encoding = "hex" } = options;
    return crypto.privateDecrypt(key, Buffer.from(data, encoding)).toString();
}

function sign(data, options = {}) {
    const { algorithm = "sha256", key, encoding = "hex" } = options;
    const sign = crypto.createSign(algorithm);
    sign.write(data);
    sign.end();
    return sign.sign(key, encoding);
}

function verify(data, signature, options = {}) {
    const { algorithm = "sha256", key, encoding = "hex" } = options;
    const verify = crypto.createVerify(algorithm);
    verify.write(data);
    verify.end();
    return verify.verify(key, signature, encoding);
}

function hash(data, options = {}) {
    const { algorithm = "sha256", encoding = "hex" } = options;
    return crypto.createHash(algorithm).update(data).digest(encoding);
}

function hmac(data, options = {}) {
    const { algorithm = "sha256", key = "", encoding = "hex" } = options;
    return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}

module.exports = {
    base64Decode,
    base64Encode,
    base64urlDecode,
    base64urlEncode,
    base32Decode,
    base32Encode,
    encrypt,
    decrypt,
    privateEncrypt,
    publicDecrypt,
    publicEncrypt,
    privateDecrypt,
    sign,
    verify,
    hash,
    hmac,
};

// var config = require('./config')
// var encoded = base64Encode('data');console.log(encoded)
// var encoded = base64Decode(encoded);console.log(encoded)

// var encoded = base64urlEncode('data');console.log(encoded)
// var encoded = base64urlDecode(encoded);console.log(encoded)

// var encoded = base32Encode('data');console.log(encoded)
// var encoded = base32Decode(encoded);console.log(encoded)

// var encoded = encrypt('data');console.log(encoded)
// var encoded = decrypt(encoded);console.log(encoded)

// var encoded = privateEncrypt('data', config.server.https.options);console.log(encoded)
// var encoded = publicDecrypt(encoded, config.server.https.options);console.log(encoded)

// var encoded = publicEncrypt('data', config.server.https.options);console.log(encoded)
// var encoded = privateDecrypt(encoded, config.server.https.options);console.log(encoded)

// var encoded = sign('data',config.server.https.options);console.log(encoded)
// var encoded = verify('data',encoded,config.server.https.options);console.log(encoded)

// var encoded = hash('data');console.log(encoded)
// var encoded = hmac('data');console.log(encoded)
