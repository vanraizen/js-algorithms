/*global describe, it*/

var expect = require('chai').expect,
    fibRecursive = require('../misc/fib')('recursive'),
    fibIterative = require('../misc/fib')('iterative');

describe('Recursive Fibonacci Tests', function () {

    describe('Check Base Cases', function () {

        it('Base Case: n = 1', function () {
            expect(fibRecursive.fib(1)).to.equal(1);
        });

        it('Base Case: n = 2', function () {
            expect(fibRecursive.fib(2)).to.equal(1);
        });
    });

    describe('Check Recursive Cases', function () {

        it('n = 3', function () {
            expect(fibRecursive.fib(3)).to.equal(2);
        });

        it('n = 4', function () {
            expect(fibRecursive.fib(4)).to.equal(3);
        });

        it('n = 5', function () {
            expect(fibRecursive.fib(5)).to.equal(5);
        });

        it('n = 6', function () {
            expect(fibRecursive.fib(6)).to.equal(8);
        });

        it('n = 7', function () {
            expect(fibRecursive.fib(7)).to.equal(13);
        });

        it('n = 8', function () {
            expect(fibRecursive.fib(8)).to.equal(21);
        });
    });
});

describe('Iterative Fibonacci Tests', function () {

    it('n = 1', function () {
        expect(fibIterative.fib(1)).to.equal(1);
    });

    it('n = 2', function () {
        expect(fibIterative.fib(2)).to.equal(1);
    });

    it('n = 3', function () {
        expect(fibIterative.fib(3)).to.equal(2);
    });

    it('n = 4', function () {
        expect(fibIterative.fib(4)).to.equal(3);
    });

    it('n = 5', function () {
        expect(fibIterative.fib(5)).to.equal(5);
    });

    it('n = 6', function () {
        expect(fibIterative.fib(6)).to.equal(8);
    });

    it('n = 7', function () {
        expect(fibIterative.fib(7)).to.equal(13);
    });

    it('n = 8', function () {
        expect(fibIterative.fib(8)).to.equal(21);
    });
});