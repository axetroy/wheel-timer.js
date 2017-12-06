const { EventEmitter } = require('events');

/**
 * Hashed and Hierarchical Timing Wheels Implement
 */
class HashWheelTimer extends EventEmitter {
  constructor(length) {
    super();
    this.length = length;
    this.currentIndex = 0;
    this.round = 0;
    this.map = new Map();
    this.slot = [];
    for (let i = 0; i < length; i++) {
      this.slot.push(new Set());
    }
  }

  /**
   * add to the list
   * @param element
   * @returns {HashWheelTimer}
   */
  add(element) {
    const i = this.currentIndex - 1;
    const index = i < 0 ? this.length - 1 : i;
    const set = this.slot[index];
    set.add(element);
    this.map.set(element, index);
    return this;
  }

  /**
   * make cursor to next tick
   */
  tick() {
    const set = this.slot[this.currentIndex];

    const values = [];

    for (let val of set.values()) {
      values.push(val);
      this.map.delete(val);
    }

    set.clear();

    this.emit('tick', values);

    // cursor
    if (this.currentIndex >= this.length - 1) {
      this.round++;
      this.currentIndex = 0;
      this.emit('round');
    } else {
      this.currentIndex++;
    }
  }
}

module.exports = HashWheelTimer;
module.exports.default = HashWheelTimer;
