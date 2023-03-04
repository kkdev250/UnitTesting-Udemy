import fs from 'fs'; // file system module from node.js
import path from 'path';

import { it, expect, vi, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import { showError } from './dom';

const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window(); // creating emulated browser
const document = window.document;
vi.stubGlobal('document', document); // replacing (in this case creating-no 'document' in node) the document object with our own stub

beforeEach(() => { // cleaning the document before each test
  document.body.innerHTML = '';
  document.write(htmlDocumentContent); // writing index.html into the virtual document
});

it('should add an error paragraph to the id="errors" element', () => {
  showError('Test');

  const errorsEl = document.getElementById('errors');
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
  const errorsEl = document.getElementById('errors');
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
  const testErrorMessage = 'Test';

  showError(testErrorMessage);

  const errorsEl = document.getElementById('errors');
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph.textContent).toBe(testErrorMessage);
});
