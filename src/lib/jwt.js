const Crypto = require("./crypto");
const crypto = require("crypto");
const moment = require("moment");

const alg = {
    HS256: {
        sign: (data, secret) => {
            return Crypto.hmac(data, { algorithm: "sha256", key: secret, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.hmac(data, { algorithm: "sha256", key: secret, encoding: "base64url" }) == signature;
        },
    },
    HS384: {
        sign: (data, secret) => {
            return Crypto.hmac(data, { algorithm: "sha384", key: secret, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.hmac(data, { algorithm: "sha384", key: secret, encoding: "base64url" }) == signature;
        },
    },
    HS512: {
        sign: (data, secret) => {
            return Crypto.hmac(data, { algorithm: "sha512", key: secret, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.hmac(data, { algorithm: "sha512", key: secret, encoding: "base64url" }) == signature;
        },
    },
    RS256: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha256", key: secret.key, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha256", key: secret.key, encoding: "base64url" });
        },
    },
    RS384: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha384", key: secret.key, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha384", key: secret.key, encoding: "base64url" });
        },
    },
    RS512: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha512", key: secret.key, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha512", key: secret.key, encoding: "base64url" });
        },
    },
    ES256: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha256", key: { key: secret.key, dsaEncoding: "ieee-p1363", padding: crypto.constants.RSA_PKCS1_PADDING, saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST }, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha256", key: { key: secret.key, dsaEncoding: "ieee-p1363", padding: crypto.constants.RSA_PKCS1_PADDING, saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST }, encoding: "base64url" });
        },
    },
    ES384: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha384", key: { key: secret.key, dsaEncoding: "ieee-p1363", padding: crypto.constants.RSA_PKCS1_PADDING, saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST }, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha384", key: { key: secret.key, dsaEncoding: "ieee-p1363", padding: crypto.constants.RSA_PKCS1_PADDING, saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST }, encoding: "base64url" });
        },
    },
    ES512: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha512", key: { key: secret.key, dsaEncoding: "ieee-p1363", padding: crypto.constants.RSA_PKCS1_PADDING, saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST }, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha512", key: { key: secret.key, dsaEncoding: "ieee-p1363", padding: crypto.constants.RSA_PKCS1_PADDING, saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST }, encoding: "base64url" });
        },
    },
    PS256: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha256", key: { key: secret.key, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha256", key: { key: secret.key, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, encoding: "base64url" });
        },
    },
    PS384: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha384", key: { key: secret.key, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha384", key: { key: secret.key, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, encoding: "base64url" });
        },
    },
    PS512: {
        sign: (data, secret) => {
            return Crypto.sign(data, { algorithm: "sha512", key: { key: secret.key, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, encoding: "base64url" });
        },
        verify: (data, signature, secret) => {
            return Crypto.verify(data, signature, { algorithm: "sha512", key: { key: secret.key, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, encoding: "base64url" });
        },
    },
};

function sign(data, header = {}, secret) {
    return alg[header.alg].sign(data, secret);
}

function encode(payload = {}, header = {}, secret) {
    let header_ = header;
    payload = JSON.stringify(payload);
    payload = Crypto.base64urlEncode(payload);
    header = JSON.stringify(header);
    header = Crypto.base64urlEncode(header);
    let data = [header, payload].join(".");
    let signature = sign(data, header_, secret);
    return [header, payload, signature].join(".");
}

function verify(data, signature, header, secret) {
    return alg[header.alg].verify(data, signature, secret);
}

function decode(token, secret) {
    let [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        const error = new Error("The access token provided is invalid for other reasons");
        error.code = "invalid_token";
        throw error;
    }
    let data = [header, payload].join(".");
    header = Crypto.base64urlDecode(header);
    header = JSON.parse(header);
    if (!verify(data, signature, header, secret)) {
        const error = new Error("The access token provided is malformed");
        error.code = "invalid_token";
        throw error;
    }
    payload = Crypto.base64urlDecode(payload);
    payload = JSON.parse(payload);
    if (payload.exp && moment().valueOf() > payload.exp) {
        const error = new Error("The access token provided is expired");
        error.code = "invalid_token";
        throw error;
    }
    return payload;
}

module.exports = {
    sign,
    encode,
    verify,
    decode,
};

// var payload = {
//     iss: "https://", //Issuer
//     exp: moment().add(1,'hours').valueOf(), //Expiration
//     iat: moment().valueOf(), //Issued
//     jti: "UUID", //JWT
// };
// var header = {
//     typ: "JWT", //	Token type
//     alg: "PS512", //	Message authentication
// };
// var config = require('./config')
// var secret = config.server.https.options;
// var token = encode(payload, header, secret);
// var payload = decode(token,secret);
// console.log(token);
// console.log(payload);
