"use strict";


var assert = require("assert"),
    AssertionsCounter = require("../src/assertions-counter");

it("AssertionsCounter must be created as an object", function () {
    try {
        AssertionsCounter("does not matter", "does not matter");
        assert.ok(false);
    } catch (e) {
        assert.ok(true);
    }
});

it("A valid number of expected assertions must be provided in constructor", function () {
    try {
        new AssertionsCounter("not a number");
        assert.ok(false);
    } catch (e) {
        assert.ok(true);
    }

    try {
        new AssertionsCounter(0);
        assert.ok(false);
    } catch (e) {
        assert.ok(true);
    }
});

it("A valid callback must be provided in constructor", function () {
    try {
        new AssertionsCounter(1, "not a function");
        assert.ok(false);
    } catch (e) {
        assert.ok(true);
    }
});

it("A valid number must be provided for adding an assertion to a counter", function (done) {
    var ac = new AssertionsCounter(1, done);

    try {
        ac.add("not a number");
        assert.ok(false);
    } catch (e) {
        assert.ok(true);
        done();
    }
});

it("A number could be omitted for adding an assertion to a counter", function (done) {
    var ac = new AssertionsCounter(1, done);
    ac.add();
});

it("A valid number for adding an assertion to a counter", function (done) {
    var ac = new AssertionsCounter(2, done);
    ac.add(2);
});

it("Add assertions to a counter several times", function (done) {
    var ac = new AssertionsCounter(5, done);
    ac.add();
    ac.add();
    ac.add(2);
    ac.add();
});

it("Too many assertions called", function (done) {
    var ac = new AssertionsCounter(1, done);
    try {
        ac.add(2);
        assert.ok(false);
    } catch (e) {
        assert.ok(true);
        done();
    }
});
