export function ToasterTimer(delay: number, callback?: () => void) {
  let remaining = delay;

  let timeOutId = 0;

  const pause = () => {
    window.clearTimeout(timeOutId);
  };

  const resume = () => {
    _startTimer();
  };

  const _startTimer = () => {
    remaining -= 100;
    if (remaining <= 0) {
      pause();
      callback?.();
      return;
    }
    timeOutId = window.setTimeout(() => {
      _startTimer();
    }, 100);
  };

  const getRemaining = () => remaining;

  return { pause, resume, getRemaining };
}
