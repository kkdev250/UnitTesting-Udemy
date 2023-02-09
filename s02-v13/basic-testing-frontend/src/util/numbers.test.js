import { it, expect, describe } from 'vitest';

import { cleanNumbers, transformToNumber } from './numbers';

describe('transformToNumber()', () => {
  it('should transfrom a string number to a number of type number', () => {
    const input = '1';
  
    const result = transformToNumber(input);
  
    expect(result).toBeTypeOf('number');
  });
  
  it('should transfrom a string number to a number of type number', () => {
    const input = '1';
  
    const result = transformToNumber(input);
  
    expect(result).toBe(+input);
  });
  
  it('should yield NaN for non-transformable values', () => {
    const input = 'invalid';
    const input2 = {};
  
    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);
  
    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe('cleanNumbers()', () => { //integration test - checks if the combination of funictions (other units) used in cleanNumbers is ok
  it('should return an array of number values if an array of string number values is provided', () => {
    const numberValues = ['1', '2'];

    const cleanedNumbers = cleanNumbers(numberValues);

    expect(cleanedNumbers[0]).toBeTypeOf('number');
  });

  it('should throw an error if an array with at least one empty string is provided', () => {
    const numberValues = ['', 1];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});
