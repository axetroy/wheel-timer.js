import test from 'ava';

import HashWheelTimer from './index';

test('init timer', t => {
  const timer = new HashWheelTimer(60);
  t.deepEqual(timer.length, 60);
  t.deepEqual(timer.slot.length, 60);
  t.true(timer.slot[0] instanceof Set);
  t.true(timer.slot[timer.length - 1] instanceof Set);
  t.true(timer.map instanceof Map);

  timer.on('tick', function(tasks) {});

  timer.add('hello world');

  t.true(timer.slot[timer.length - 1].has('hello world'));
  t.true(timer.map.has('hello world'));
  t.deepEqual(timer.map.get('hello world'), timer.length - 1);

  for (let i = 0; i < 60 - 1; i++) {
    timer.tick();
  }

  // have not been delete
  t.deepEqual(timer.currentIndex, timer.length - 1);
  t.true(timer.slot[timer.currentIndex].has('hello world'));
  t.true(timer.map.has('hello world'));
  t.deepEqual(timer.map.get('hello world'), timer.length - 1);

  // tick and delete
  timer.tick();
  t.deepEqual(timer.currentIndex, 0);
  t.false(timer.slot[timer.length - 1].has('hello world'));
  t.false(timer.map.has('hello world'));
  t.deepEqual(timer.map.get('hello world'), void 0);

  timer.tick();
  timer.add('hello world again');

  t.true(timer.slot[timer.currentIndex - 1].has('hello world again'));
  t.true(timer.map.has('hello world again'));
  t.deepEqual(timer.map.get('hello world again'), timer.currentIndex - 1);
});
