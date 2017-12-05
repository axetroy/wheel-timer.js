const HashWheelTimer = require('../index');

class SecondTimer extends HashWheelTimer {
  constructor() {
    super(60);
    this.currentIndex = new Date().getSeconds(); // get current minute and set
  }
  tick() {
    const beforeRound = this.round;
    super.tick();
    const afterRound = this.round;

    if (afterRound > beforeRound) {
      minute.tick();
    }
  }
}

class MinuteTimer extends HashWheelTimer {
  constructor() {
    super(60);
    this.currentIndex = new Date().getMinutes(); // get current minute and set
  }
  tick() {
    const beforeRound = this.round;
    super.tick();
    const afterRound = this.round;

    if (afterRound > beforeRound) {
      hour.tick();
    }
  }
}

class HourTimer extends HashWheelTimer {
  constructor() {
    super(24);
    this.currentIndex = new Date().getHours(); // get current hour and set
  }
}

const second = new SecondTimer();
const minute = new MinuteTimer();
const hour = new HourTimer();

second.on('tick', () => {
  console.log(`current second: ${second.currentIndex}`);
});

minute.on('tick', () => {
  console.log(`current minute: ${minute.currentIndex}`);
});

hour.on('tick', () => {
  console.log(`current hour: ${hour.currentIndex}`);
});

setInterval(() => {
  second.tick();
}, 1000);
