// const chai = require('chai');
// const expect = chai.expect;
// const sinon = require('sinon');
// const { EventEmitter } = require('events');
// const { get } = require('../src/lib/mssql');
// const { VarChar, MAX } = require('mssql/msnodesqlv8');

// const serviceBroker = require('../src/lib/service-broker');

// describe('serviceBroker', () => {
//   let getStub;
//   let requestStub;
//   let responseStub;

//   before(() => {
//     // Stubbing the "get" function from "./mssql" module
//     getStub = sinon.stub(get, 'get');

//     // Stubbing the "request" function from the mssql pool
//     requestStub = sinon.stub();
//     getStub.withArgs('service-broker').returns({ request: requestStub });

//     // Stubbing the "execute" function of the request object
//     responseStub = sinon.stub();
//     requestStub.returns({ execute: responseStub });
//   });

//   after(() => {
//     // Restoring the original functions
//     get.get.restore();
//   });

//   afterEach(() => {
//     // Resetting the stubs after each test
//     getStub.resetHistory();
//     requestStub.resetHistory();
//     responseStub.resetHistory();
//   });

//   it('should send a message via service broker', async () => {
//     const eventName = 'inbox';
//     const message = { user: 'name' };

//     const expectedRequestBody = JSON.stringify([{ eventName, ...message }]);
//     const expectedRequestInput = { message: { type: VarChar(MAX), value: expectedRequestBody } };

//     await serviceBroker.send(eventName, message);

//     expect(getStub.calledOnceWithExactly('service-broker')).to.be.true;
//     expect(requestStub.calledOnce).to.be.true;
//     expect(requestStub.firstCall.args[0]).to.deep.equal(expectedRequestInput);
//     expect(responseStub.calledOnceWithExactly('ksp_send')).to.be.true;
//   });

//   it('should receive messages via service broker', async () => {
//     const recordset = [
//       { message_body: JSON.stringify([{ eventName: 'inbox', user: 'name1' }]) },
//       { message_body: JSON.stringify([{ eventName: 'inbox', user: 'name2' }]) },
//       { message_body: JSON.stringify([{ eventName: 'inbox', user: 'name3' }]) },
//     ];

//     const executeStub = sinon.stub().returns({ recordset });
//     responseStub.withArgs('ksp_receive').returns({ execute: executeStub });

//     const eventListener = sinon.stub();
//     serviceBroker.on('inbox', eventListener);

//     await serviceBroker.receive();

//     expect(getStub.calledOnceWithExactly('service-broker')).to.be.true;
//     expect(requestStub.calledOnce).to.be.true;
//     expect(responseStub.calledOnceWithExactly('ksp_receive')).to.be.true;
//     expect(executeStub.calledOnceWithExactly('ksp_receive')).to.be.true;
//     expect(eventListener.callCount).to.equal(3);
//     expect(eventListener.getCall(0).args[0]).to.deep.equal({ eventName: 'inbox', user: 'name1' });
//     expect(eventListener.getCall(1).args[0]).to.deep.equal({ eventName: 'inbox', user: 'name2' });
//     expect(eventListener.getCall(2).args[0]).to.deep.equal({ eventName: 'inbox', user: 'name3' });
//   });
// });
