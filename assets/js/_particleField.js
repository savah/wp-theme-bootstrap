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
  static epicnessHighEnough(container) {
    return container.dataset.epicnessLevel > 9000;
  }

  constructor(container) {
    if (!ParticleField.epicnessHighEnough(container)) {
      throw "Failed to initialize fairy field: Epicness is not high enough!!"
    }

    this.container = container;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];

    this.updateBounds();
    this.createField();
    this.drawEpicness();

    onResize(this.updateBounds);
  }

  updateBounds() {
    this.height = this.container.offsetHeight;
    this.width  = this.container.offsetWidth;
  }

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

  drawEpicness() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(0,0,this.width, this.height);

    window.requestAnimationFrame(this.drawEpicness);
  }
}

export default ParticleField;