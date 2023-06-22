const chai = require('chai');
const expect = chai.expect;

const fetch = require('../src/lib/fetch'); // Replace 'fetch' with the actual module path

describe('Fetch Function', () => {
  it('should fetch data from a URL', async () => {
    const response = await fetch('http://google.com');
    expect(response.status).to.equal(200);
    const text = await response.text();
    expect(text).to.be.a('string');
    // Additional assertions for the fetched data
  });

  it('should fetch JSON data from a URL', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status).to.equal(200);
    const json = await response.json();
    expect(json).to.be.an('object');
    // Additional assertions for the fetched JSON data
  });

  it('should send a POST request with JSON data', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      redirect:'manual',
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    expect(response.status).to.equal(201);
    const json = await response.json();
    expect(json).to.be.an('object');
    // Additional assertions for the response data
  });

  // Add more test cases for different scenarios and request methods

  // ...

});
