
import tinycoloy from 'tinycolor2';

/**
 * WatchMeLoad creates a component in your DOM which can be activated and
 * deactivated to indicate a global loading process. The primary purpose is
 * to visually indicate a client side load period.
 */
class WatchMeLoad {
  /**
   * Instantiate a new loading indicator.
   * @param {Element} container The container to attach this indicator to.
   */
  constructor(container) {
    if (!container || typeof container.appendChild !== 'function') {
      throw new Error('Invalid container. ' +
        'Please provide a valid document container.');
    }

    // Setup the root element.
    const app = document.createElement('div');
    app.style.position = 'fixed';
    app.style.left = 0;
    app.style.top = 0;
    app.style.opacity = 0;


    // Setup the indicator
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.left = 0;
    indicator.style.top = 0;
    indicator.style.height = '2px';

    // Add the components to the DOM.
    app.appendChild(indicator);
    container.appendChild(app);

    // Save references to our elements
    this.app = app;
    this.indicator = indicator;
    this.tickId = undefined;

    this.tick = this.tick.bind(this);
  }

  /**
   * Start indicating that a load is occuring.
   * @param {string} backgroundColor The color you want the indicator to render.
   */
  startLoading(backgroundColor) {
    if (!backgroundColor || typeof backgroundColor !== 'string') {
      throw new Error('Invalid color. ' +
        'Please provide a valid color in string representation');
    }

    const bg = tinycoloy(backgroundColor);

    // Set styles and kick off the tiemout
    this.indicator.style.backgroundColor = backgroundColor;
    this.indicator.style.transition = 'width 0.4s ease 0s';
    this.indicator.style.width = `0%`;
    this.indicator.style.boxShadow =
      `0 0 10px ${bg.setAlpha(.7).toRgbString()}`;

    // We want the root element to light up immediately.
    this.app.style.transition = null;
    this.app.style.opacity = 1;

    // Kick off the loader
    this.tickId = setTimeout(this.tick(0, 10), 10);
  }

  /**
   * Stop the loading indication. This will immediately visualize a 100%
   * load complete state.
   */
  stopLoading() {
    clearTimeout(this.tickId);

    this.app.style.transition = '0.4s linear 0.4s';
    this.app.style.opacity = 0;

    this.indicator.style.width = '100%';

    // Reset the width to 0 after we are done animating.
    setTimeout(() => {
      this.indicator.style.width = '0%';
    }, 800);
  }

  /**
   * Tick is a curry that returns a closure for a setTimeout call.
   * @param {number} count The current tick count.
   * @param {number} width The current indicator width.
   * @return {function} The callback used in a setTimeout.
   */
  tick(count, width) {
    return () => {
      // Update the indicator width
      this.indicator.style.width = `${width += 5}%`;
      if (count++ < 3) {
        this.tickId = setTimeout(this.tick(count, width), 1000);
      } else if (width === 80) {
        // We don't update anymore once it hits 80.
        clearTimeout(this.tickId);
      } else {
        this.tickId = setTimeout(this.tick(count, width), 2700);
      }
    };
  }
}

export default WatchMeLoad;
