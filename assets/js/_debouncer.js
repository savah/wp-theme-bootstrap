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
   * @param event
   * @param target
   */
  constructor(event, target) {
    var self = this;

    target = target || window;

    if ('string' !== typeof event) {
      throw "Debouncer: Debouncer can only debounce events of type string";
    }

    // properties
    self.callbacks = [];
    self.running = false;

    // register listener
    if (window.addEventListener) {
      target.addEventListener(event, bouncer, false);
    } else if (window.attachEvent) {
      target.attachEvent(`on${event}`, bouncer);
    } else {
      target[`on${event}`] = bouncer;
    }

    ///////////////////////////////

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
      throw "Debouncer: registered callback must be callable";
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
      throw "Debouncer: registered callback must be callable";
    }

    let indexOfCb = this.callbacks.indexOf(cb);
    if (-1 < indexOfCb) {
      this.callbacks.splice(indexOfCb, 1);
    }
    return indexOfCb;
  }
}

export default Debouncer;