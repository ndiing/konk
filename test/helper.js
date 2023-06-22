const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const { read, write } = require('../src/lib/helper'); // Replace 'fileUtils' with the actual module path

describe('File Utils', () => {
  const testDir = path.join(__dirname, 'test');
  const testFile = path.join(testDir, 'testfile.txt');
  const testFileJSON = path.join(testDir, 'testfile.json');
  const testFileGZ = path.join(testDir, 'testfile.gz');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should write and read a file', () => {
    const testData = 'Hello, World!';
    write(testFile, testData);
    const result = read(testFile);

    expect(result).to.equal(testData);
  });

  it('should write and read a JSON file', () => {
    const testData = { message: 'Hello, World!' };
    write(testFileJSON, testData);
    const result = read(testFileJSON);

    expect(result).to.deep.equal(testData);
  });

  it('should write and read a gzipped file', () => {
    const testData = 'Hello, World!';
    write(testFileGZ, testData);
    const result = read(testFileGZ);

    expect(result).to.equal(testData);
  });

  // Add more test cases to cover other scenarios

  // ...
});
