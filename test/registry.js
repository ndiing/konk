// const chai = require('chai');
// const expect = chai.expect;
// const { execSync } = require('child_process');
// const sinon = require('sinon');

// const { setProxyServer, getProxyServer, installTrustedRootCertificate } = require('../src/lib/registry');

// describe('Proxy Functions', () => {
//   let sandbox;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe('setProxyServer', () => {
//     it('should enable the proxy server', () => {
//       const enable = true;
//       const hostname = '127.0.0.1';
//       const port = 8888;
//       const expectedProxyEnable = 1;
//       const expectedProxyServer = `http=${hostname}:${port};https=${hostname}:${port};ftp=${hostname}:${port}`;

//       sandbox.stub(execSync, 'execSync');

//       const result = setProxyServer(enable, hostname, port);

//       expect(result).to.be.true;
//       expect(execSync.execSync.calledOnceWithExactly(
//         `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d ${expectedProxyEnable} /f & reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /d "${expectedProxyServer}" /f`
//       )).to.be.true;
//     });

//     it('should disable the proxy server', () => {
//       const enable = false;
//       const expectedProxyEnable = 0;
//       const expectedProxyServer = '';

//       sandbox.stub(execSync, 'execSync');

//       const result = setProxyServer(enable);

//       expect(result).to.be.true;
//       expect(execSync.execSync.calledOnceWithExactly(
//         `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d ${expectedProxyEnable} /f & reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /d "${expectedProxyServer}" /f`
//       )).to.be.true;
//     });
//   });

//   describe('getProxyServer', () => {
//     it('should return the proxy server settings if enabled', () => {
//       const expectedProxyEnableOutput = '  ProxyEnable    REG_DWORD    0x1\r\n';
//       const expectedProxyServerOutput = '  ProxyServer    REG_SZ    http=127.0.0.1:8888;https=127.0.0.1:8888;ftp=127.0.0.1:8888\r\n';
//       const expectedProxyServerSettings = [
//         'http://127.0.0.1',
//         'https://127.0.0.1',
//         'ftp://127.0.0.1',
//       ];

//       sandbox.stub(execSync, 'execSync')
//         .onFirstCall().returns(expectedProxyEnableOutput)
//         .onSecondCall().returns(expectedProxyServerOutput);

//       const result = getProxyServer();

//       expect(result).to.deep.equal(expectedProxyServerSettings);
//       expect(execSync.execSync.getCall(0).args).to.deep.equal(['reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable', { encoding: 'utf8' }]);
//       expect(execSync.execSync.getCall(1).args).to.deep.equal(['reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer', { encoding: 'utf8' }]);
//     });

//     it('should return null if the proxy server is not enabled', () => {
//       const expectedProxyEnableOutput = '  ProxyEnable    REG_DWORD    0x0\r\n';

//       sandbox.stub(execSync, 'execSync').returns(expectedProxyEnableOutput);

//       const result = getProxyServer();

//       expect(result).to.be.null;
//       expect(execSync.execSync.calledOnceWithExactly(
//         'reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable',
//         { encoding: 'utf8' }
//       )).to.be.true;
//     });
//   });

//   describe('installTrustedRootCertificate', () => {
//     it('should install the trusted root certificate', () => {
//       const dir = '../';

//       sandbox.stub(execSync, 'execSync');

//       const result = installTrustedRootCertificate(dir);

//       expect(result).to.be.true;
//       expect(execSync.execSync.calledOnceWithExactly(
//         `powershell -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c cd ${dir} && certutil -enterprise -addstore -f root ${dir}/root.cert'"`,
//         { shell: 'powershell' }
//       )).to.be.true;
//     });
//   });
// });
