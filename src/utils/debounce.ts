export const debounce = <TFunc extends (...args: unknown[]) => void>(
  f: TFunc,
  delayMs: number
) => {
  let timerId: number | undefined = undefined;

  return function (...args: Parameters<TFunc>): void {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f(...args);
    }, delayMs);
  };
};
