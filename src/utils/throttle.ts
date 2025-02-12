export const throttle = <TFunc extends (...args: unknown[]) => void>(
  f: TFunc,
  waitMs: number
) => {
  let timeout: number | NodeJS.Timeout | undefined = undefined;
  let lastRun = 0;

  return function (...args: Parameters<TFunc>) {
    const now = new Date().getTime();

    if (now - lastRun >= waitMs) {
      f(...args);
      lastRun = now;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        f(...args);
        lastRun = new Date().getTime();
      }, waitMs - (now - lastRun));
    }
  };
};
