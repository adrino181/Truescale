
export function throttle(fn, delay) {
  let run = false;
  return function(...args) {
    if (!run) {
      fn(...args);
      run = true;
      setTimeout(() => (run = false), delay);
    }
  };
}

export function debounce(fn, delay) {
  let timer: ReturnType<typeof setTimeout>;
  return function(...args) {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => fn(...args), delay);
  };
}
