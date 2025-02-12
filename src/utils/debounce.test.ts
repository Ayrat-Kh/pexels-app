import { beforeEach, expect, test, vitest } from 'vitest';
import { debounce } from './debounce';
import { afterEach } from 'node:test';

beforeEach(() => {
  vitest.useFakeTimers();
});

afterEach(() => {
  vitest.useRealTimers();
});

test('should debounce twice', () => {
  const fakeFn = vitest.fn();

  const debounced = debounce(fakeFn, 20);

  debounced();
  debounced();

  expect(fakeFn).not.toHaveBeenCalled();

  vitest.advanceTimersByTime(21);
  expect(fakeFn).toHaveBeenCalledOnce();
});
