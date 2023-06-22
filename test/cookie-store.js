const chai = require('chai');
const expect = chai.expect;

const CookieStore = require('../src/lib/cookie-store'); // Replace 'your-module' with the actual module path

describe('CookieStore', () => {
  let cookieStore;

  beforeEach(() => {
    cookieStore = new CookieStore();
  });

  describe('set and get', () => {
    it('should set and get a cookie', () => {
      cookieStore.set('name', 'value');
      const result = cookieStore.get('name');
      expect(result).to.deep.equal({
        domain: undefined,
        expires: undefined,
        name: 'name',
        partitioned: undefined,
        path: undefined,
        sameSite: undefined,
        value: 'value'
      });
    });

    it('should set and get multiple cookies', () => {
      cookieStore.set('name1', 'value1');
      cookieStore.set('name2', 'value2');
      const result1 = cookieStore.get('name1');
      const result2 = cookieStore.get('name2');
      expect(result1).to.deep.equal({
        domain: undefined,
        expires: undefined,
        name: 'name1',
        partitioned: undefined,
        path: undefined,
        sameSite: undefined,
        value: 'value1'
      });
      expect(result2).to.deep.equal({
        domain: undefined,
        expires: undefined,
        name: 'name2',
        partitioned: undefined,
        path: undefined,
        sameSite: undefined,
        value: 'value2'
      });
    });
  });

  describe('delete', () => {
    it('should delete a cookie', () => {
      cookieStore.set('name', 'value');
      cookieStore.delete('name');
      const result = cookieStore.get('name');
      expect(result).to.be.undefined;
    });
  });

  describe('cookie', () => {
    it('should return a formatted cookie string', () => {
      cookieStore.set('name1', 'value1');
      cookieStore.set('name2', 'value2');
      const result = cookieStore.cookie;
      expect(result).to.equal('name1=value1; name2=value2');
    });

    it('should handle empty cookie values', () => {
      cookieStore.set('name', '');
      const result = cookieStore.cookie;
      expect(result).to.equal('name=');
    });
  });
});
