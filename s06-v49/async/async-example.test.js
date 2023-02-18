import { it, expect } from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

// TESTING ASYNC CODE - CALLBACKS
it('should generate a token value', (done) => {  //done - fn for testing callbacks...
  const testUserEmail = 'test@test.com';
  generateToken(testUserEmail, (err, token) => { // anonymous async fn
    try {
      expect(token).toBeDefined();               // when testing async code you have run 'expect' in try-catch block
      // expect(token).toBe(2);
      done();                                    // ...just put 'done' at the end of the async code
    } catch (err) {
      done(err);                                 // ...here put 'done' as well - passing the error
    }
  });
});

// TESTING ASYNC CODE - PROMISES
it('should generate a token value', () => {                                  // testing promises:
  const testUserEmail = 'test@test.com';
  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined(); // 1-st way: return expect().resolves.toBe...
  // return expect(generateTokenPromise(testUserEmail)).resolves.toBe(2);
});

it('should generate a token value', async () => {                            // 2-nd way: make fn async...
  const testUserEmail = 'test@test.com';
  const token = await generateTokenPromise(testUserEmail);                   // ...await, get the result...
  expect(token).toBeDefined();
  // expect(token).toBe(2);                                                  //...and simply test it
});