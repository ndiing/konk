const fs = require("fs");
const path = require("path");
const { generateCertificateAuthority, generateCertificateHostname } = require("./certificate");
const { installTrustedRootCertificate } = require("./registry");

function getCertificateAuthority() {
    let root = {};
    try {
        root.key = fs.readFileSync(path.join(dir, "root.key"), { encoding: "utf8" });
        root.cert = fs.readFileSync(path.join(dir, "root.cert"), { encoding: "utf8" });
    } catch (error) {
        root = generateCertificateAuthority();
        fs.writeFileSync(path.join(dir, "root.key"), root.key);
        fs.writeFileSync(path.join(dir, "root.cert"), root.cert);
        installTrustedRootCertificate(dir);
    }
    return root;
}

function getCertificateHostname() {
    let host = {};
    try {
        host.key = fs.readFileSync(path.join(dir, "host.key"), { encoding: "utf8" });
        host.cert = fs.readFileSync(path.join(dir, "host.cert"), { encoding: "utf8" });
    } catch (error) {
        const root = getCertificateAuthority();
        host = generateCertificateHostname("localhost", root);
        fs.writeFileSync(path.join(dir, "host.key"), host.key);
        fs.writeFileSync(path.join(dir, "host.cert"), host.cert);
    }
    return host;
}

const dir = process.cwd();
const data = path.join(dir, "data");
const options = getCertificateHostname();

const config = {
    path: { dir, data },
    server: {
        hostname: "0.0.0.0",
        http: { port: 80 },
        https: { options, port: 443 },
    },
    mssql: {
        config: {
            user: "",
            password: "",
            database: "otomax",
            server: "localhost",
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000,
            },
            options: {
                encrypt: false,
                trustServerCertificate: true,
                trustedConnection: true,
            },
        },
    },
    permissions: [],
};

module.exports = config;
