var expect = require('chai').expect,
    misc = require('../misc');

describe('Misc Tests', function() {

    describe('Detect Duplicates', function () {

        it('Array Duplicates: Test Map Usage with numbers', function () {
            expect(misc.listDuplicatesInArray([1, 2, 3, 4, 4, 5, 7, 7])).to.have.members([4, 7]);
        });

        it('Array Duplicates: Test Map Usage with mixed elements', function () {
            expect(misc.listDuplicatesInArray([1, 'knight', 1, 4, 5, 'knight', 7, 'king'])).to.have.members(['knight', 1]);
        });

        it('String Duplicates: Test O(n^2) solution', function () {
            expect(misc.listDuplicatesInString("abcdefghijk", "ijab")).to.equal('abij');
            expect(misc.listDuplicatesInString("a&8kKL<ASDF", "ZXCV<>")).to.equal('<');
            expect(misc.listDuplicatesInString("AZSDS", "ZEE3#A")).to.equal('AZ');
            expect(misc.listDuplicatesInString("S S S A Z X", "X A A #")).to.equal(' AX');
        });

        it('String Duplicates: Test O(n) solution', function () {
            expect(misc.listDuplicatesInString("abcdefghijk", "ijab", true)).to.equal('abij');
            expect(misc.listDuplicatesInString("a&8kKL<ASDF", "ZXCV<>", true)).to.equal('<');
            expect(misc.listDuplicatesInString("AZSDS", "ZEE3#A", true)).to.equal('AZ');
            expect(misc.listDuplicatesInString("S S S A Z X", "X A A #", true)).to.equal(' AX');
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