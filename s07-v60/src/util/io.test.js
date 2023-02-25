import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';

import writeData from './io';
import exp from 'constants';

vi.mock('fs'); // automocking (if no __mocks__ folder): ALL function in 'fs' module will be replaced with spies
//vi.mock('fs') is automatically hoisted - no need to put this line before importing 'fs'
//jest.mock('fs') is NOT hoisted - you HAVE TO put this line before importing 'fs'

vi.mock('path', () => {
  return {
    default: {  // mocking the default export of 'path' module
      join: (...args) => {
        return args[args.length - 1]; // now the mocked 'join' will return the last argument passed to 'join' method (i.e. the filename)
      }
    }
  };
});

it('sholud execute the writeFile method', () => {
  const testData = 'Test';
  const testFilename = 'test.txt';

  writeData(testData, testFilename);

  // return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  // expect(fs.writeFile).toBeCalled();
  expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});

it('sholud return a prmise that resolves to no value if called correctly', () => {
  const testData = 'Test';
  const testFilename = 'test.txt';

  writeData(testData, testFilename);

  return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  // expect(fs.writeFile).toBeCalled();
  // expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});