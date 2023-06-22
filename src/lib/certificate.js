const forge = require("node-forge");

const defaultAttrs = [
    { name: "countryName", value: "ID" },
    { name: "organizationName", value: "Ndiing" },
    { shortName: "ST", value: "JATIM" },
    { shortName: "OU", value: "Ndiing SSL" },
];

function isIpDomain(domain = "") {
    const ipReg = /^\d+?\.\d+?\.\d+?\.\d+?$/;
    return ipReg.test(domain);
}

function getExtensions(domain = "") {
    const isIp = isIpDomain(domain);
    if (isIp) {
        return { name: "subjectAltName", altNames: [{ type: 7, ip: domain }] };
    } else {
        return { name: "subjectAltName", altNames: [{ type: 2, value: domain }] };
    }
}

function generateKeyPair(serialNumber) {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = serialNumber || Math.floor(Math.random() * 100000) + "";
    const now = Date.now();
    cert.validity.notBefore = new Date(now - 24 * 60 * 60 * 1000);
    cert.validity.notAfter = new Date(now + 824 * 24 * 60 * 60 * 1000);
    return { keys, cert };
}

function generateCertificateAuthority(commonName) {
    const keysAndCert = generateKeyPair();
    const keys = keysAndCert.keys;
    const cert = keysAndCert.cert;
    commonName = commonName || "CertManager";
    const attrs = defaultAttrs.concat([{ name: "commonName", value: commonName }]);
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.setExtensions([{ name: "basicConstraints", cA: true }]);
    cert.sign(keys.privateKey, forge.md.sha256.create());
    return {
        key: forge.pki.privateKeyToPem(keys.privateKey),
        // publicKey: forge.pki.publicKeyToPem(keys.publicKey),
        cert: forge.pki.certificateToPem(cert),
    };
}

function generateCertificateHostname(domain, rootCAConfig) {
    const md = forge.md.md5.create();
    md.update(domain);
    const keysAndCert = generateKeyPair(md.digest().toHex());
    const keys = keysAndCert.keys;
    const cert = keysAndCert.cert;
    const caCert = forge.pki.certificateFromPem(rootCAConfig.cert);
    const caKey = forge.pki.privateKeyFromPem(rootCAConfig.key);
    cert.setIssuer(caCert.subject.attributes);
    const attrs = defaultAttrs.concat([{ name: "commonName", value: domain }]);
    const extensions = [{ name: "basicConstraints", cA: false }, getExtensions(domain)];
    cert.setSubject(attrs);
    cert.setExtensions(extensions);
    cert.sign(caKey, forge.md.sha256.create());
    return {
        key: forge.pki.privateKeyToPem(keys.privateKey),
        // publicKey: forge.pki.publicKeyToPem(keys.publicKey),
        cert: forge.pki.certificateToPem(cert),
    };
}

module.exports = {
    isIpDomain,
    getExtensions,
    generateKeyPair,
    generateCertificateAuthority,
    generateCertificateHostname,
};


// console.log(isIpDomain('127.0.0.1'))
// console.log(getExtensions())
// console.log(generateKeyPair())
// var root = generateCertificateAuthority()
// console.log(root)
// var host = generateCertificateHostname('localhost',root)
// console.log(host)