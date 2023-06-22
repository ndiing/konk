const chai = require('chai');
const expect = chai.expect;
const { Readable } = require('stream');
const Headers = require('../src/lib/headers');
const http = require('http');
const https = require('https');

const Request = require('../src/lib/request');

describe('Request', () => {
  it('should initialize with default values', () => {
    const input = 'https://example.com/path?query=param#fragment';
    const options = {};

    const request = new Request(input, options);

    expect(request.protocol).to.equal('https:');
    expect(request.origin).to.equal('https://example.com');
    expect(request.client).to.equal(https);
    expect(request.hostname).to.equal('example.com');
    expect(request.port).to.equal(443);
    expect(request.host).to.equal('example.com');
    expect(request.path).to.equal('/path?query=param#fragment');
    expect(request.agent).to.be.an.instanceOf(https.Agent);
    expect(request.insecureHTTPParser).to.be.true;
    expect(request.timeout).to.equal(1000 * 60 * 60);
    expect(request.body).to.be.an.instanceOf(Readable);
    expect(request.headers).to.be.an.instanceOf(Headers);
    expect(request.method).to.equal('GET');
    expect(request.redirect).to.equal('follow');
    expect(request.follow).to.equal(30);
    expect(request.url).to.equal('https://example.com/path?query=param#fragment');
  });

  it('should use custom options', () => {
    const input = 'http://localhost:8080';
    const options = {
      path: '/api',
      agent: new http.Agent(),
      insecureHTTPParser: false,
      timeout: 5000,
      body: 'Hello, World!',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      redirect: 'manual',
      follow: 10,
    };

    const request = new Request(input, options);

    expect(request.protocol).to.equal('http:');
    expect(request.origin).to.equal('http://localhost:8080');
    expect(request.client).to.equal(http);
    expect(request.hostname).to.equal('localhost');
    expect(request.port).to.equal(8080);
    expect(request.host).to.equal('localhost:8080');
    expect(request.path).to.equal('/api');
    expect(request.agent).to.be.an.instanceOf(http.Agent);
    expect(request.insecureHTTPParser).to.be.false;
    expect(request.timeout).to.equal(5000);
    expect(request.body).to.be.an.instanceOf(Readable);
    expect(request.headers).to.be.an.instanceOf(Headers);
    expect(request.headers.get('Content-Type')).to.equal('application/json');
    expect(request.method).to.equal('POST');
    expect(request.redirect).to.equal('manual');
    expect(request.follow).to.equal(10);
    expect(request.url).to.equal('http://localhost:8080/api');
  });
});
