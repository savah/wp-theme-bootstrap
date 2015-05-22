/**
 * Event Debouncer
 *
 */
class Debouncer {
  /**
   * Register an event
   * Debounce handler on
   * a specific target
   *
   * @param events string
   * @param maybeTarget
   */
  constructor(events, maybeTarget) {
    let self = this;
    let target = maybeTarget || window;

    if ('string' !== typeof events) {
      throw new Error('Debouncer: Debouncer can only debounce events of type string');
    }

    // properties
    self.callbacks = [];
    self.running = false;

    // register listener
    if (window.addEventListener) {
      target.addEventListener(events, bouncer, false);
    } else if (window.attachEvent) {
      target.attachEvent(`on${events}`, bouncer);
    } else {
      target[`on${events}`] = bouncer;
    }

    // /////////////////////////////

    /**
     * Run all attached callbacks
     * if there aren't any already
     * running
     *
     *
     */
    function bouncer(event) {
      if (0 < self.callbacks.length && !self.running) {
        self.running = true;
        window.requestAnimationFrame(() => {
          self.callbacks.forEach(cb => cb(event));
          self.running = false;
        });
      }
    }
  }

  /**
   * Attach a new callback
   * to the Debouncer
   *
   * @param cb
   * @returns {Number}
   */
  register(cb) {
    if ('function' !== typeof cb) {
      throw new Error('Debouncer: registered callback must be callable');
    }
    return this.callbacks.push(cb);
  }


  /**
   * Remove a callback from
   * the array of callbacks
   * attached to the
   * Debouncer
   *
   * @param cb
   * @returns {Number}
   */
  deregister(cb) {
    if ('function' !== typeof cb) {
      throw new Error('Debouncer: registered callback must be callable');
    }

    let indexOfCb = this.callbacks.indexOf(cb);
    if (-1 < indexOfCb) {
      this.callbacks.splice(indexOfCb, 1);
    }
    return indexOfCb;
  }
}

export default Debouncer;
