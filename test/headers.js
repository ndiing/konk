const chai = require('chai');
const expect = chai.expect;

const Headers = require('../src/lib/headers'); // Replace 'Headers' with the actual module path

describe('Headers Class', () => {
  let headers;

  beforeEach(() => {
    headers = new Headers();
  });

  it('should append headers', () => {
    headers.append('Set-Cookie', 'name=value');
    headers.append('Set-Cookie', 'name1=value1');
    headers.append('Set-Cookie', 'name12=value12');
    headers.append('Set-Cookie', 'name123=value123');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    expect(headers.get('Set-Cookie')).to.deep.equal([
      'name=value',
      'name1=value1',
      'name12=value12',
      'name123=value123',
    ]);
    expect(headers.get('Accept')).to.equal('application/json');
    expect(headers.get('Content-Type')).to.equal('application/json');
  });

  it('should delete headers', () => {
    headers.append('Accept', 'application/json');
    headers.delete('Accept');

    expect(headers.has('Accept')).to.be.false;
  });

  it('should iterate over header entries', () => {
    headers.append('Set-Cookie', 'name=value');
    headers.append('Content-Type', 'application/json');

    const entries = Array.from(headers.entries());

    expect(entries).to.deep.equal([
      ['Set-Cookie', 'name=value'],
      ['Content-Type', 'application/json'],
    ]);
  });

  it('should iterate over header values', () => {
    headers.append('Set-Cookie', 'name=value');
    headers.append('Content-Type', 'application/json');

    const values = Array.from(headers.values());

    expect(values).to.deep.equal(['name=value', 'application/json']);
  });

  // Add more test cases to cover other methods of the Headers class

  // ...
});
