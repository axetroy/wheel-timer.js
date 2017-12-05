const HashWheelTimer = require('../index');

class SecondTimer extends HashWheelTimer {
  constructor() {
    super(60);
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

class OrderTimer extends HashWheelTimer {
  constructor() {
    super(12);
  }
}

const second = new SecondTimer();
const minute = new MinuteTimer();
const orderTimer = new OrderTimer();

// run task one hour
orderTimer.on('tick', tasks => {
  for (let i = 0; i < tasks.length; i++) {
    const orderId = tasks[i];
    // do your job, mark this order as "invalid"
    markOrderAsInvalid(orderId);
  }
});

// create order
// if use not pay of this in 12 hours, the order will be mark as "invalid"
function createOrder() {
  const order = { id: Math.random(), createdAt: new Date() };

  // add the the order timer
  orderTimer.add(order.id);

  return order;
}

function markOrderAsInvalid(orderId) {
  // do something
}

// only one timer
setInterval(() => {
  second.tick();
}, 1000);
