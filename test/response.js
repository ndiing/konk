const chai = require('chai');
const expect = chai.expect;
const zlib = require('zlib');
const { Readable } = require('stream');
const Headers = require('../src/lib/headers');
const { Blob } = require('buffer');

const Response = require('../src/lib/response');

describe('Response', () => {
  it('should initialize with default values', () => {
    const body = new Readable();
    const options = {};

    const response = new Response(body, options);

    expect(response.headers).to.be.an.instanceOf(Headers);
    expect(response.status).to.be.undefined;
    expect(response.statusText).to.be.undefined;
    expect(response.ok).to.be.false;
    expect(response.url).to.be.undefined;
    expect(response.body).to.equal(body);
  });

  it('should use custom options', () => {
    const body = new Readable();
    const options = {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
      url: 'https://example.com',
    };

    const response = new Response(body, options);

    expect(response.headers).to.be.an.instanceOf(Headers);
    expect(response.headers.get('Content-Type')).to.equal('application/json');
    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK');
    expect(response.ok).to.be.true;
    expect(response.url).to.equal('https://example.com');
    expect(response.body).to.equal(body);
  });

  it('should decompress body based on "Content-Encoding" header', () => {
    const compressedBody = zlib.gzipSync('compressed data');
    const body = new Readable();
    body.push(compressedBody);
    body.push(null);

    const options = {
      headers: { 'Content-Encoding': 'gzip' },
    };

    const response = new Response(body, options);

    expect(response.body).to.be.an.instanceOf(zlib.Gunzip);
  });

  it('should provide buffer representation of the body', async () => {
    const bodyData = 'Hello, World!';
    const body = new Readable();
    body.push(bodyData);
    body.push(null);

    const response = new Response(body);

    const buffer = await response.buffer();
    expect(buffer.toString()).to.equal(bodyData);
  });

  it('should provide array buffer representation of the body', async () => {
    const bodyData = 'Hello, World!';
    const body = new Readable();
    body.push(bodyData);
    body.push(null);

    const response = new Response(body);

    const arrayBuffer = await response.arrayBuffer();
    expect(arrayBuffer).to.be.an.instanceOf(ArrayBuffer);
    expect(Buffer.from(arrayBuffer).toString()).to.equal(bodyData);
  });

  it('should provide blob representation of the body', async () => {
    const bodyData = 'Hello, World!';
    const body = new Readable();
    body.push(bodyData);
    body.push(null);

    const response = new Response(body);

    const blob = await response.blob();
    expect(blob).to.be.an.instanceOf(Blob);
    expect(await blob.text()).to.equal(bodyData);
  });

//   it('should clone the response', async () => {
//     const bodyData = 'Hello, World!';
//     const body = new Readable();
//     body.push(bodyData);
//     body.push(null);

//     const response = new Response(body);

//     const clone = await response.clone();
//     expect(clone).to.not.equal(response);
//     expect(clone.body).to.not.equal(response.body);
//     expect(await clone.text()).to.equal(bodyData);
//   });

  it('should parse the body as JSON', async () => {
    const jsonData = { message: 'Hello, World!' };
    const body = new Readable();
    body.push(JSON.stringify(jsonData));
    body.push(null);

    const response = new Response(body, { headers: { 'Content-Type': 'application/json' } });

    const parsedJson = await response.json();
    expect(parsedJson).to.deep.equal(jsonData);
  });

  it('should provide text representation of the body', async () => {
    const bodyData = 'Hello, World!';
    const body = new Readable();
    body.push(bodyData);
    body.push(null);

    const response = new Response(body);

    const text = await response.text();
    expect(text).to.equal(bodyData);
  });
});
