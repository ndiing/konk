const chai = require('chai');
const expect = chai.expect;

const {
  base64Encode,
  base64Decode,
  base64urlEncode,
  base64urlDecode,
  base32Encode,
  base32Decode,
  encrypt,
  decrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  privateDecrypt,
  sign,
  verify,
  hash,
  hmac
} = require('../src/lib/crypto'); // Replace 'your-module' with the actual module path
const config = require('../src/lib/config')

describe('Base64 Encoding and Decoding', () => {
  it('should encode data to base64', () => {
    const encoded = base64Encode('data');
    expect(encoded).to.equal('ZGF0YQ==');
  });

  it('should decode base64 data', () => {
    const decoded = base64Decode('ZGF0YQ==');
    expect(decoded).to.equal('data');
  });
});

describe('Base64 URL Encoding and Decoding', () => {
  it('should encode data to base64url', () => {
    const encoded = base64urlEncode('data');
    expect(encoded).to.equal('ZGF0YQ');
  });

  it('should decode base64url data', () => {
    const decoded = base64urlDecode('ZGF0YQ');
    expect(decoded).to.equal('data');
  });
});

describe('Base32 Encoding and Decoding', () => {
  it('should encode data to base32', () => {
    const encoded = base32Encode('data');
    expect(encoded).to.equal('MRQXIYI');
  });

  it('should decode base32 data', () => {
    const decoded = base32Decode('MRQXIYI');
    expect(decoded).to.equal('data');
  });
});

describe('Encryption and Decryption', () => {
  it('should encrypt and decrypt data', () => {
    const data = 'data';
    const encrypted = encrypt(data);
    const decrypted = decrypt(encrypted);
    expect(decrypted).to.equal(data);
  });
});

describe('Public and Private Key Encryption and Decryption', () => {
  it('should encrypt and decrypt data using public and private keys', () => {
    const data = 'data';
    const encrypted = privateEncrypt(data, { key: config.server.https.options.key });
    const decrypted = publicDecrypt(encrypted, { key: config.server.https.options.key });
    expect(decrypted).to.equal(data);
  });
});

describe('Data Signing and Verification', () => {
  it('should sign and verify data', () => {
    const data = 'data';
    const signature = sign(data, { key: config.server.https.options.key });
    const verified = verify(data, signature, { key: config.server.https.options.key });
    expect(verified).to.be.true;
  });
});

describe('Hashing', () => {
  it('should hash data', () => {
    const hashed = hash('data');
    expect(hashed).to.equal('3a6eb0790f39ac87c94f3856b2dd2c5d110e6811602261a9a923d3bb23adc8b7');
  });
});

describe('HMAC', () => {
  it('should generate HMAC', () => {
    const hmacValue = hmac('data');
    expect(hmacValue).to.equal('e528c4d99e6177f5841f712a143b90843299a4aa181a06501422d9ca862bd2a5');
  });
});
