const chai = require('chai');
const expect = chai.expect;
const forge = require('node-forge');

const {
  isIpDomain,
  getExtensions,
  generateKeyPair,
  generateCertificateAuthority,
  generateCertificateHostname
} = require('../src/lib/certificate'); // Replace 'your-module' with the actual module path

describe('Your Module', () => {
  describe('isIpDomain', () => {
    it('should return true for valid IP domains', () => {
      const result = isIpDomain('127.0.0.1');
      expect(result).to.be.true;
    });

    it('should return false for non-IP domains', () => {
      const result = isIpDomain('example.com');
      expect(result).to.be.false;
    });
  });

  describe('getExtensions', () => {
    it('should return IP subject alternative name extensions for IP domains', () => {
      const result = getExtensions('127.0.0.1');
      expect(result).to.deep.equal({
        name: 'subjectAltName',
        altNames: [{ type: 7, ip: '127.0.0.1' }]
      });
    });

    it('should return domain subject alternative name extensions for non-IP domains', () => {
      const result = getExtensions('example.com');
      expect(result).to.deep.equal({
        name: 'subjectAltName',
        altNames: [{ type: 2, value: 'example.com' }]
      });
    });
  });

  describe('generateKeyPair', () => {
    it('should generate a key pair with the specified serial number', () => {
      const serialNumber = '12345';
      const result = generateKeyPair(serialNumber);
      expect(result.keys).to.be.an('object');
      expect(result.cert.serialNumber).to.equal(serialNumber);
    });

    it('should generate a key pair with a random serial number if not specified', () => {
      const result = generateKeyPair();
      expect(result.keys).to.be.an('object');
      expect(result.cert.serialNumber).to.be.a('string');
    });
  });

  describe('generateCertificateAuthority', () => {
    it('should generate a certificate authority with the specified common name', () => {
      const commonName = 'CustomCA';
      const result = generateCertificateAuthority(commonName);
      expect(result.key).to.be.a('string');
      expect(result.cert).to.be.a('string');
      // Add more assertions if needed
    });

    it('should generate a certificate authority with the default common name if not specified', () => {
      const result = generateCertificateAuthority();
      expect(result.key).to.be.a('string');
      expect(result.cert).to.be.a('string');
      // Add more assertions if needed
    });
  });

  describe('generateCertificateHostname', () => {
    it('should generate a certificate for the specified domain', () => {
      const domain = 'example.com';
      const rootCAConfig = generateCertificateAuthority();
      const result = generateCertificateHostname(domain, rootCAConfig);
      expect(result.key).to.be.a('string');
      expect(result.cert).to.be.a('string');
      // Add more assertions if needed
    });

    // Add more test cases for different scenarios if needed
  });
});
