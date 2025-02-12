import { beforeEach, expect, test, vitest } from 'vitest';
import { throttle } from './throttle';
import { afterEach } from 'node:test';

beforeEach(() => {
  vitest.useFakeTimers();
});

afterEach(() => {
  vitest.useRealTimers();
});

test('should throttle twice', () => {
  const fakeFn = vitest.fn();

  const dateGetDateMock = vitest.spyOn(Date.prototype, 'getTime');

  dateGetDateMock.mockReturnValue(0);

  const throttled = throttle(fakeFn, 20);

  throttled();
  throttled();

  expect(fakeFn).not.toHaveBeenCalled();

  vitest.advanceTimersByTime(21);
  expect(fakeFn).toHaveBeenCalledOnce();

  throttled();
  throttled();

  vitest.advanceTimersByTime(21);

  expect(fakeFn).toHaveBeenCalledTimes(2);

  dateGetDateMock.mockReset();
});
