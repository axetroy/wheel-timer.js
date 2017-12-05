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

// run second one second
second.on('tick', tasks => {
  console.log(
    `current second: ${
      second.currentIndex
    }, and here is the task should be run ${tasks.length}`
  );
});

// run task one minute
minute.on('tick', tasks => {
  console.log(
    `current minute: ${
      minute.currentIndex
    }, and here is the task should be run ${tasks.length}`
  );
});

// run task one hour
hour.on('tick', tasks => {
  console.log(
    `current hour: ${hour.currentIndex}, and here is the task should be run ${
      tasks.length
    }`
  );
});

// only one timer
setInterval(() => {
  second.tick();
}, 1000);
