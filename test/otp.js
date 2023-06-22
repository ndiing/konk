// const chai = require('chai');
// const expect = chai.expect;
// const sinon = require('sinon');
// const crypto = require('crypto');
// const moment = require('moment');

// const { hotp, totp, otpauth } = require('../src/lib/otp');

// describe('OTP functions', () => {
//   let sandbox;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe('hotp', () => {
//     it('should generate a HOTP', () => {
//       const secret = 'secret';
//       const counter = 0;
//       const algorithm = 'sha1';
//       const digits = 6;
//       const encoding = 'ascii';
//       const expectedHash = '7d6e7c';

//       sandbox.stub(crypto, 'createHmac').returns({
//         update: sandbox.stub().returnsThis(),
//         digest: sandbox.stub().returns(expectedHash),
//       });

//       const result = hotp({ secret, counter, algorithm, digits, encoding });

//       expect(result).to.equal(expectedHash.slice(0, digits));
//       expect(crypto.createHmac.calledOnceWithExactly(algorithm, Buffer.from(secret))).to.be.true;
//       expect(crypto.createHmac().update.calledOnceWithExactly(Buffer.alloc(8).writeUInt32BE(counter, 4))).to.be.true;
//       expect(crypto.createHmac().digest.calledOnceWithExactly('hex')).to.be.true;
//     });
//   });

//   describe('totp', () => {
//     it('should generate a TOTP', () => {
//       const secret = 'secret';
//       const time = moment('2023-06-22T12:00:00Z').unix();
//       const start = 0;
//       const period = 30;
//       const algorithm = 'sha1';
//       const digits = 6;
//       const encoding = 'ascii';
//       const expectedHOTP = '7d6e7c';

//       sandbox.stub(moment, 'unix').returns(time);
//       sandbox.stub(crypto, 'createHmac').returns({
//         update: sandbox.stub().returnsThis(),
//         digest: sandbox.stub().returns(expectedHOTP),
//       });

//       const result = totp({ secret, time, start, period, algorithm, digits, encoding });

//       expect(result).to.equal(expectedHOTP.slice(0, digits));
//       expect(moment.unix.calledOnceWithExactly(time)).to.be.true;
//       expect(crypto.createHmac.calledOnceWithExactly(algorithm, Buffer.from(secret))).to.be.true;
//       expect(crypto.createHmac().update.calledOnceWithExactly(Buffer.alloc(8).writeUInt32BE(0, 4))).to.be.true;
//       expect(crypto.createHmac().digest.calledOnceWithExactly('hex')).to.be.true;
//     });
//   });

//   describe('otpauth', () => {
//     it('should generate an OTPAuth object', () => {
//       const type = 'totp';
//       const label = 'user';
//       const secret = 'secret';
//       const issuer = 'Konek';
//       const algorithm = 'sha1';
//       const digits = 6;
//       const counter = 0;
//       const period = 30;

//       const expectedSecret = Buffer.alloc(64);
//       const expectedEncodedSecret = 'ONSWG4TH4V5B6ZDFOM======';
//       const expectedURL = 'otpauth://totp/user?secret=ONSWG4TH4V5B6ZDFOM%3D%3D%3D%3D%3D%3D%3D%3D&issuer=Konek&algorithm=sha1&digits=6&period=30';
//       const expectedQR = 'https://chart.googleapis.com/chart?cht=qr&chs=256x256&chl=' + encodeURIComponent(expectedURL);

//       sandbox.stub(crypto, 'randomBytes').returns(expectedSecret);

//       const result = otpauth({ type, label, secret, issuer, algorithm, digits, counter, period });

//       expect(result.type).to.equal(type);
//       expect(result.label).to.equal(label);
//       expect(result.secret).to.equal(expectedEncodedSecret);
//       expect(result.issuer).to.equal(issuer);
//       expect(result.algorithm).to.equal(algorithm);
//       expect(result.digits).to.equal(digits);
//       expect(result.counter).to.equal(counter);
//       expect(result.period).to.equal(period);
//       expect(result.url).to.equal(expectedURL);
//       expect(result.qr).to.equal(expectedQR);
//       expect(crypto.randomBytes.calledOnceWithExactly(64)).to.be.true;
//     });
//   });
// });
