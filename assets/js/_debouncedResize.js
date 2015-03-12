/**
 * Optimized Debounced Resize
 * Event runner
 *
 */
class DebouncedResize {
  constructor() {
    window.addEventListener('resize', this.resize);
    this.callbacks = [];
    this.running = false;
  }

  resize() {
    if (!this.running) {
      this.running = true;
      window.requestAnimationFrame(() => {
        this.callbacks.foreach(cb => cb());
        this.running = false;
      });
    }
  }

  add(cb) {
    if ('function' !== typeof cb) {
      throw "DebouncedResize: registered callback must be callable";
    }
    return this.callbacks.push(cb);
  }
}

export default new DebouncedResize();