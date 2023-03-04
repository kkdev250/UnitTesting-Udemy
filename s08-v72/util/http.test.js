import { it, vi, expect } from 'vitest';

import { HttpError } from './errors';
import { sendDataRequest } from './http';

const testResponseData = { testKey: 'testData' };

const testFetch = vi.fn((url, options) => { // replacement for fetch
  return new Promise((resolve, reject) => {
    if (typeof options.body !== 'string') {
      return reject('Not a string'); //or reject(); return;
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal('fetch', testFetch);

it('should return any available response data', () =>{
  const testData = { key: 'test' };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it('should convert the provided data to JSON before sending the request', async () => { //async!
  const testData = { key: 'test' };

  // return expect(sendDataRequest(testData)).rejects;                          // OK - da się sprawdzić czy rejectuje
  // return expect(sendDataRequest(testData)).rejects.toBe('Not a string');     // OK - da się sprawdzić czy rejectuje z konkretym błędem
  // return expect(sendDataRequest(testData)).not.rejects;                      // OK - da się sprawdzić czy się nie rejectuje
  // return expect(sendDataRequest(testData)).not.rejects.toBe('Not a string'); // NOT OK! (...ale nie da się sprawdzić czy nie zrejectowało się z konkretnym błędem)
  // jeśli chcemy przetestować czy NIE było rejecta z konkretnym błędem to:

  let errorMessage;
  
  try {
    await sendDataRequest(testData)
  } catch (error) {
    errorMessage = error;
  };

  expect(errorMessage).not.toBe('Not a string');
});

it('should throw and HttpError in case of non-ok responses', () => {
  testFetch.mockImplementationOnce((url, options) => { //na potrzeby tego testu zmieniamy replacement fetch'a tak aby jego pole 'ok' było false
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  const testData = { key: 'test' };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
