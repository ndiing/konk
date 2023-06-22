// const chai = require('chai');
// const expect = chai.expect;
// const sinon = require('sinon');

// const Crypto = require('../src/lib/crypto');
// const moment = require('moment');

// const {
//   sign,
//   encode,
//   verify,
//   decode
// } = require('../src/lib/jwt'); // Replace 'jwtUtils' with the actual module path

// describe('JWT Utils', () => {
//   let sandbox;

//   before(() => {
//     sandbox = sinon.createSandbox();
//   });

//   after(() => {
//     sandbox.restore();
//   });

//   describe('sign', () => {
//     it('should sign the data using the specified algorithm and secret', () => {
//       const data = 'test';
//       const secret = 'secret';
//       const expectedSignature = 'signature';

//       sandbox.stub(Crypto, 'hmac').returns(expectedSignature);

//       const signature = sign(data, { algorithm: 'sha256' }, secret);

//       expect(signature).to.equal(expectedSignature);
//       expect(Crypto.hmac.calledOnceWith(data, {
//         algorithm: 'sha256',
//         key: secret,
//         encoding: 'base64url'
//       })).to.be.true;
//     });
//   });

//   describe('encode', () => {
//     it('should encode the payload and header, and append the signature', () => {
//       const payload = { key: 'value' };
//       const header = { alg: 'HS256' };
//       const secret = 'secret';
//       const expectedToken = 'encoded.token';

//       sandbox.stub(Crypto, 'base64urlEncode')
//         .onFirstCall().returns('encoded.header')
//         .onSecondCall().returns('encoded.payload');
//       sandbox.stub(Crypto, 'hmac').returns('signature');

//       const token = encode(payload, header, secret);

//       expect(token).to.equal(expectedToken);
//       expect(Crypto.base64urlEncode.calledTwice).to.be.true;
//       expect(Crypto.base64urlEncode.firstCall.calledWithExactly(JSON.stringify(header))).to.be.true;
//       expect(Crypto.base64urlEncode.secondCall.calledWithExactly(JSON.stringify(payload))).to.be.true;
//       expect(Crypto.hmac.calledOnceWith('encoded.header.encoded.payload', {
//         algorithm: 'HS256',
//         key: secret,
//         encoding: 'base64url'
//       })).to.be.true;
//     });
//   });

//   describe('verify', () => {
//     it('should verify the data using the specified algorithm, signature, and secret', () => {
//       const data = 'test.data';
//       const signature = 'signature';
//       const header = { alg: 'HS256' };
//       const secret = 'secret';

//       sandbox.stub(Crypto, 'hmac').returns('calculated.signature');

//       const result = verify(data, signature, header, secret);

//       expect(result).to.be.true;
//       expect(Crypto.hmac.calledOnceWith(data, {
//         algorithm: 'HS256',
//         key: secret,
//         encoding: 'base64url'
//       })).to.be.true;
//     });
//   });

//   describe('decode', () => {
//     it('should decode and verify the token, returning the payload', () => {
//       const token = 'encoded.token';
//       const secret = 'secret';
//       const header = { alg: 'HS256' };
//       const payload = { key: 'value' };

//       sandbox.stub(Crypto, 'base64urlDecode')
//         .onFirstCall().returns(JSON.stringify(header))
//         .onSecondCall().returns(JSON.stringify(payload));
//       sandbox.stub(Crypto, 'hmac').returns(true);
//       sandbox.stub(moment, 'valueOf').returns(1234567890);

//       const result = decode(token, secret);

//       expect(result).to.deep.equal(payload);
//       expect(Crypto.base64urlDecode.calledTwice).to.be.true;
//       expect(Crypto.base64urlDecode.firstCall.calledWithExactly('encoded.header')).to.be.true;
//       expect(Crypto.base64urlDecode.secondCall.calledWithExactly('encoded.payload')).to.be.true;
//       expect(Crypto.hmac.calledOnce).to.be.true;
//       expect(moment.valueOf.calledOnce).to.be.true;
//     });

//     it('should throw an error if the token is invalid or expired', () => {
//       // Test case for an invalid token
//       const invalidToken = 'invalid.token';
//       const invalidTokenError = new Error('The access token provided is invalid for other reasons');
//       invalidTokenError.code = 'invalid_token';

//       // Test case for an expired token
//       const expiredToken = 'expired.token';
//       const expiredTokenError = new Error('The access token provided is expired');
//       expiredTokenError.code = 'invalid_token';

//       sandbox.stub(Crypto, 'base64urlDecode').returns(JSON.stringify({}));
//       sandbox.stub(moment, 'valueOf').returns(9999999999); // Expired token

//       expect(() => decode(invalidToken, 'secret')).to.throw(invalidTokenError);
//       expect(() => decode(expiredToken, 'secret')).to.throw(expiredTokenError);
//     });
//   });
// });
