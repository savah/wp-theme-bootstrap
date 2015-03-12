var { add:onResize } = require('./_debouncedResize');
var Particle = require('./_particle');

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
    return container.dataset.epicnessLevel > 9000;
  }


	/**
	 * Kick off the particle field
	 * if it's allowed...
	 *
	 * @param container
	 */
  constructor(container) {
		var self = this;
    if (!ParticleField.epicnessHighEnough(container)) {
      throw "Failed to initialize particle field: Epicness is not high enough!!"
    }

		// properties
    self.container = container;

    self.canvas = document.createElement('canvas');
    self.ctx = self.canvas.getContext('2d');
    
    self.particles = [];


		// abstract class methods
		self.drawEpicness = drawEpicness;
		self.updateBounds = updateBounds;


		// initialize the particle field
		self.init();

		////////////////////////////////////////

		/**
		 * Update the bounds of the
		 * canvas
		 *
		 */
		function updateBounds() {
			self.height = self.container.offsetHeight;
			self.width = self.container.offsetWidth;
		}


		/**
		 * Draw a frame on the canvas
		 *
		 */
		function drawEpicness() {

			self.ctx.fillStyle = 'mediumseagreen';
			self.ctx.fillRect(0, 0, self.width, self.height);

			let halfW = Math.floor(self.width / 2);
			let halfH = Math.floor(self.height / 2);
			self.ctx.fillStyle = 'white';
			self.ctx.fillRect(
				halfW - 50,
				halfH - 50,
				halfW + 50,
				halfH + 50
			);

			window.requestAnimationFrame(self.drawEpicness);
		}
  }


	/**
	 * Initialize the particle field
	 *
	 */
	init() {
		this.updateBounds();
		this.createField();
		this.drawEpicness();

		// update bounds on resize
		// so responsive much wow
		onResize(this.updateBounds);
	}


	/**
	 * Create the canvas element on
	 * the page and give it the
	 * required styles
	 *
	 */
  createField() {
    let canvasStyles = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'zIndex': -1,
      'height': '100%',
      'width': '100%'
    };

    this.container.appendChild(this.canvas);
    for (let property in canvasStyles) {
      if (canvasStyles.hasOwnProperty(property)) {
        setTimeout(() => this.canvas.style[property] = canvasStyles[property], 0);
      }
    }
  }
}

export default ParticleField;