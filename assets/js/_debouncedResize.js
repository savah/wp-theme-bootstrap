/**
 * Optimized Debounced Resize
 * Event runner
 *
 */
class DebouncedResize {
  constructor() {
		var self = this;

    window.addEventListener('resize', self.resize);
    self.callbacks = [];
    self.running = false;

		self.resize = resize;
		self.add    = add;

		function resize() {
			if (!self.running) {
				self.running = true;
				window.requestAnimationFrame(() => {
					self.callbacks.foreach(cb => cb());
					self.running = false;
				});
			}
		}

		function add(cb) {
			if ('function' !== typeof cb) {
				throw "DebouncedResize: registered callback must be callable";
			}
			return self.callbacks.push(cb);
		}
  }
}

export default new DebouncedResize();