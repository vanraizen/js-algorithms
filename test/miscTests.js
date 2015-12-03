var expect = require('chai').expect,
    misc = require('../misc');

describe('Misc Tests', function() {

    describe('Detect Duplicates', function () {

        it('Test Map Usage with numbers', function () {
            expect(misc.listDuplicatesInArray([1, 2, 3, 4, 4, 5, 7, 7])).to.have.members([4, 7]);
        });

        it('Test Map Usage with mixed elements', function () {
            expect(misc.listDuplicatesInArray([1, 'knight', 1, 4, 5, 'knight', 7, 'king'])).to.have.members(['knight', 1]);
        });
    });

    describe('Binary Search', function () {

        it('Basic Number Search', function () {
            expect(misc.binarySearch([1, 2, 5, 77, 222, 1, 2, 7], 222)).to.equal(true);
            expect(misc.binarySearch([1, 2, 5, 77, 222, 1, 2, 7, 0], 0)).to.equal(true);
            expect(misc.binarySearch([1, 2, 5, 77, 222, 1, 2, 7, 0, 4], 4)).to.equal(true);
            expect(misc.binarySearch([1, 2, 5, 77, 222, 1, 2, 7], 80)).to.equal(false);
        });
    });
});