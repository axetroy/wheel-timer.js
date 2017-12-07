## Hashed and Hierarchical Timing Wheels Implement

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/wheel-timer.js.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/wheel-timer.js.svg?branch=master)](https://travis-ci.org/axetroy/wheel-timer.js)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=6.0-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/%40axetroy%2Fstruct.svg)](https://badge.fury.io/js/%40axetroy%2Fstruct)
![Size](https://github-size-badge.herokuapp.com/axetroy/wheel-timer.js.svg)
[![Coverage Status](https://coveralls.io/repos/github/axetroy/wheel-timer.js/badge.svg?branch=master)](https://coveralls.io/github/axetroy/wheel-timer.js?branch=master)
[![Dependency](https://david-dm.org/axetroy/wheel-timer.svg)](https://david-dm.org/axetroy/wheel-timer)

Useful to do some delay job.

![](https://github.com/axetroy/wheel-timer.js/raw/master/screenshot.png)

## Usage

```javascript
const HashWheelTimer = require('wheel-timer');

const timer = new HashWheelTimer(60);

timer.on('tick', values => {});

timer.add({ uid: 'xxxx-xxxx-xxxx' });

setInterval(() => {
  timer.tick();
}, 1000);
```

## Example

Here is a example to use with multiple time wheel

![](https://github.com/axetroy/wheel-timer.js/raw/master/cron.jpg)

```javascript
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
```

And here is another example

here is the demand: 

user create an order to buy something, if he not pay for this in 12hours.
we should mark this order as "invalid"

```javascript
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

```

## Contributing

[Contributing Guid](https://github.com/axetroy/wheel-timer.js/blob/master/CONTRIBUTING.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroy/wheel-timer.js/commits?author=axetroy) [🐛](https://github.com/axetroy/wheel-timer.js/issues?q=author%3Aaxetroy) 🎨 |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxetroy%2Fwheel-timer.js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxetroy%2Fwheel-timer.js?ref=badge_large)
