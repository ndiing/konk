const { execSync } = require("child_process");

function setProxyServer(enable, hostname = "127.0.0.1", port = 8888) {
    const ProxyEnable=enable ? 1 : 0
    const ProxyServer=enable ? `http=${hostname}:${port};https=${hostname}:${port};ftp=${hostname}:${port}` : ""
    execSync(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d ${ProxyEnable} /f & reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /d "${ProxyServer}" /f`);
    return true;
}

function getProxyServer() {
    const stdout = execSync('reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable', { encoding: "utf8" });
    if (stdout.includes("0x1")) {
        const stdout = execSync('reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer', { encoding: "utf8" });
        return Array.from(stdout.matchAll(/([^=; ]*)=([^=;\r\n]*)/g), ([, name, value]) => [name, value].join("://"));
    }
    return null;
}

function installTrustedRootCertificate(dir) {
    execSync(`powershell -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c cd ${dir} && certutil -enterprise -addstore -f root ${dir}/root.cert'"`, { shell: "powershell" });
    return true;
}

module.exports = {
    setProxyServer,
    getProxyServer,
    installTrustedRootCertificate,
};

// setProxyServer(1);
// console.log(getProxyServer());
// setProxyServer(0);
// installTrustedRootCertificate()
