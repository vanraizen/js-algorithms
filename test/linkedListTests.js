var expect = require('chai').expect,
    linkedLists = require('../misc/linkedLists');

describe('Test Stack', function () {

    var stack = new linkedLists.Stack();

    describe('PUSH', function () {

        it('Push to empty set', function () {

            expect(stack.getSize()).to.equal(0);
            stack.push(5);
            expect(stack.getSize()).to.equal(1);

            expect(stack.print()).to.equal('[5]');
        });

        it('Push non-empty set size=1', function () {

            expect(stack.getSize()).to.equal(1);
            stack.push(10);
            expect(stack.getSize()).to.equal(2);

            expect(stack.print()).to.equal('[10, 5]');
        });

        it('Push non-empty set size=2', function () {

            expect(stack.getSize()).to.equal(2);
            stack.push(15);
            expect(stack.getSize()).to.equal(3);

            expect(stack.print()).to.equal('[15, 10, 5]');
        });
    });

    describe('POP', function () {

        it('Pop empty set', function () {

            var stack = new linkedLists.Stack();

            expect(stack.getSize()).to.equal(0);
            expect(stack.pop()).to.equal(null);
            expect(stack.print()).to.equal('[]');
        });

        it('Pop non-empty set size=3 [15, 10, 5]', function () {

            expect(stack.getSize()).to.equal(3);
            expect(stack.pop()).to.equal(15);
            expect(stack.getSize()).to.equal(2);

            expect(stack.print()).to.equal('[10, 5]');
        });

        it('Pop non-empty set size=2 [10, 5]', function () {

            expect(stack.getSize()).to.equal(2);
            expect(stack.pop()).to.equal(10);
            expect(stack.getSize()).to.equal(1);

            expect(stack.print()).to.equal('[5]');
        });

        it('Pop non-empty set size=1 [5]', function () {

            expect(stack.getSize()).to.equal(1);
            expect(stack.pop()).to.equal(5);
            expect(stack.getSize()).to.equal(0);

            expect(stack.print()).to.equal('[]');
        });
    });
});

describe('Test Queue', function () {

    var queue = new linkedLists.Queue();

    describe('QUEUE', function () {

        it('Queue to empty set', function () {

            expect(queue.getSize()).to.equal(0);
            queue.enqueue(5);
            expect(queue.getSize()).to.equal(1);

            expect(queue.print()).to.equal('[5]');
        });

        it('Queue non-empty set size=1', function () {

            expect(queue.getSize()).to.equal(1);
            queue.enqueue(10);
            expect(queue.getSize()).to.equal(2);

            expect(queue.print()).to.equal('[5, 10]');
        });

        it('Queue non-empty set size=2', function () {

            expect(queue.getSize()).to.equal(2);
            queue.enqueue(15);
            expect(queue.getSize()).to.equal(3);

            expect(queue.print()).to.equal('[5, 10, 15]');
        });
    });

    describe('DEQUEUE', function () {

        it('Dequeue empty set', function () {

            var queue = new linkedLists.Queue();

            expect(queue.getSize()).to.equal(0);
            expect(queue.dequeue()).to.equal(null);
            expect(queue.print()).to.equal('[]');
        });

        it('Dequeue non-empty set size=3 [5, 10, 15]', function () {

            //This is to test the prev pointer assignments with the Queue because the
            //Queue is using a doubly-linked list
            expect(queue.printReverse()).to.equal('[15, 10, 5]');

            expect(queue.getSize()).to.equal(3);
            expect(queue.dequeue()).to.equal(5);
            expect(queue.getSize()).to.equal(2);

            expect(queue.print()).to.equal('[10, 15]');
        });

        it('Dequeue non-empty set size=2 [10, 15]', function () {

            expect(queue.getSize()).to.equal(2);
            expect(queue.dequeue()).to.equal(10);
            expect(queue.getSize()).to.equal(1);

            expect(queue.print()).to.equal('[15]');
        });

        it('Dequeue non-empty set size=1 [15]', function () {

            expect(queue.getSize()).to.equal(1);
            expect(queue.dequeue()).to.equal(15);
            expect(queue.getSize()).to.equal(0);

            expect(queue.print()).to.equal('[]');
        });
    });
});