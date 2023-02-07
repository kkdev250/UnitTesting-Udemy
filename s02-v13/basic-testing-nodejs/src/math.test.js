import { it, expect } from 'vitest'; //'test'==='it'

import { add } from './math'; //vitest lets us to skip the '.js' in imports

it('should summarize all number values in an array', () => {
  // Arrange phase
  const numbers = [1, 2];

  // Act phase
  const result = add(numbers);

  // Assert phase
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => prevValue + curValue, 
    0
  );
  expect(result).toBe(expectedResult);
});

it('should yield NaN if at least one invalid number is provided', () => {
  const inputs = ['invalid', 1];

  const result = add(inputs);

  expect(result).toBeNaN();
});

it('should yield a correct sum if an array of numeric string values is provided', () => {
 const numbers = ['1', '2'];

 const result = add(numbers);

 const expectedResult = numbers.reduce(
  (prevValue, curValue) => +prevValue + +curValue, 
  0
);
 expect(result).toBe(expectedResult)
});

it('should yield 0 if an empty array is provided', () => {
  const numbers = [];

  const result = add(numbers);

  expect(result).toBe(0); //or opposite test: expect(result).not.toBe(0)
});

it('should throw an error if no value is passed into the function', () => {
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow(/is not iterable/); //or opposite test: expect(resultFn).not.toThrow()
});

it('should throw an error if provided with multiple arguments instead of array', () => {
  const num1 = 1;
  const num2 = 2;

  const resultFn = () => {
    add(num1, num2);
  };

  expect(resultFn).toThrow(/is not iterable/); //regexp - contains string 'is not iterable'
});