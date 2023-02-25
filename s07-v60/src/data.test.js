import { describe, it, expect, vi } from 'vitest'; //'vi'==='jest' in jest  

import { generateReportData } from './data';

describe('generateReportData()', () => {
  it('should execute logFn if provided', () => {
    const logger = vi.fn(); // 'spy' - empty function that keeps track of its arguments and execution
// alternatlively: vi.fn(() => {...code...}) - this spy won't be empty, it will run your code
// or: 
//  logger.mockImplementation(() => {...code...}) - adding custom code to existing spy
//  logger.mockImplementationOnce(() => {...code...}) - this code will be run only once

    generateReportData(logger);

    expect(logger).toBeCalled();
    // expect(logger).toBeCalledTimes(1);
  });
});