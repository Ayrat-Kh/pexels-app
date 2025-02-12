// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <TFunc extends (...args: any[]) => void>(
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
