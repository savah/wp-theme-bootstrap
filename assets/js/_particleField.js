import Debouncer from './_debouncer';

/**
 * A field of
 * Particles
 *
 * @author Max GJ Panas <m@maxpanas.com>
 * @license MIT
 */
class ParticleField {
  /**
   * If the epicness level
   * is not over 9000... then
   * go home!
   *
   * just a demo of a static
   * function
   *
   * @param container
   * @returns {boolean}
   */
  static epicnessHighEnough(container) {
    return 9000 < container.dataset.epicnessLevel;
  }


  /**
   * Kick off the particle field
   * if it's allowed...
   *
   * @param container
   */
  constructor(container) {
    let self = this;

    if (!ParticleField.epicnessHighEnough(container)) {
      throw new Error('Failed to initialize particle field: Epicness is not high enough!!');
    }

    // properties
    self.container = container;
    self.canvas = document.createElement('canvas');

    self.mouse = {x: 0, y: 0};
    self.previousFrame = {};

    // initialize the particle field
    self.updateBounds();
    self.createField();
    self.drawEpicness();

    // update bounds on resize
    // so responsive much wow
    new Debouncer('resize').register(self.updateBounds.bind(self));
    // get mouse position on mousemove
    new Debouncer('mousemove').register(self.updateMouse.bind(self));
  }

	/**
	 * Update the bounds of the
	 * canvas
	 *
	 */
	updateBounds() {
		let self = this;

		self.canvas.height = self.container.offsetHeight;
		self.canvas.width = self.container.offsetWidth;
	}


	/**
	 * Update the position of
	 * the mouse
	 *
	 * @param event
	 */
	updateMouse(event) {
		let self = this;

		self.mouse = {
			x: event.pageX,
			y: event.pageY
		};
	}


	/**
	 * Draw a frame on the canvas
	 *
	 */
	drawEpicness(time) {
		let self = this;

		// //////// calculate stuff
		let dt = (time - self.previousFrame.time) / 1000; // in seconds
		if (0.03 < dt) {
			// safety net for when you leave
			// the tab for a bit and come back
			dt = 0.03;
		}

		let cx = self.previousFrame.cx || self.canvas.height / 2;
		let cy = self.previousFrame.cy || self.canvas.width / 2;
		let dx = self.mouse.x - cx;
		let dy = self.mouse.y - cy;

		let m = 0.25;

		let fx = 10 * dx + 0.9 * m * (self.previousFrame.ax || 0); // f = 10*x + 0.9*m*a
		let fy = 10 * dy + 0.9 * m * (self.previousFrame.ay || 0);

		let ax = fx / m; // a = f/m
		let ay = fy / m;

		cx += ax * dt * dt; // x = a*t^2
		cy += ay * dt * dt;

		self.previousFrame = {time, cx, cy, ax, ay};

		// /////// draw stuff

		self.ctx.globalCompositeOperation = 'lighter';
		self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

		let radius = 50;
		self.ctx.fillStyle = 'rgba(255,255,255,0.7)';
		self.ctx.beginPath();
		self.ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
		self.ctx.fill();

		// /////// do it all over again :)
		window.requestAnimationFrame(self.drawEpicness.bind(self));
	}


  /**
   * Create the canvas element on
   * the page and give it the
   * required styles
   *
   */
  createField() {
		let self = this;

    let canvasStyles = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'zIndex': -1,
      'height': '100%',
      'width': '100%'
    };

    self.container.appendChild(self.canvas);
    setTimeout(() => {
      for (let property in canvasStyles) {
        if (canvasStyles.hasOwnProperty(property)) {
          self.canvas.style[property] = canvasStyles[property];
        }
      }
    }, 0);

    self.ctx = self.canvas.getContext('2d');
  }
}

export default ParticleField;
