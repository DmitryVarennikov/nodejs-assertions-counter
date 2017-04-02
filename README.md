Assertions counter
=======================

[![Build Status](https://travis-ci.org/dVaffection/nodejs-assertions-counter.png?branch=master)](https://travis-ci.org/dVaffection/nodejs-assertions-counter)

A simple assertions counter for asynchronous code testing

## Installation

`npm install assertions-counter`

## Usage

Example with [mocha](http://mochajs.org/)

It's convenient to count your assertions especially for mocked objects. In the example below a counter is called 2 times:
first in the mocked `worker.changeState` method, second in the callback function for `worker.cleanIO` method.
As the counter is equal to zero — mocha `done` function is called. Thus we match assertions number and test finish.

```javascript

it('cleanIO', function (done) {
    var ac = new AssertionsCounter(2, done);

    var worker = {
            changeState: function (newState) {
                assert.instanceOf(newState, IdleState);
                ac.add();
            }
        },
        program = {
            cleanIO: function (callback) {
                callback(null);
            }
        },
        storage,
        state = new TerminatedState(worker, storage, program);

    state.cleanIO(function (err) {
        assert.isNull(err);

        ac.add();
    });
});

```
