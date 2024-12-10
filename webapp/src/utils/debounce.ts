export function debounce(fn, delay) {
  let timer: ReturnType<typeof setTimeout>;
  return function(...args) {
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimeout(() => fn(...args), delay);
  };
}
