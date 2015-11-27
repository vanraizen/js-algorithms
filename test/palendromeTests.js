var expect = require('chai').expect,
    palendromeRecursive = require('../palendrome')('recursive'),
    palendromeIterative = require('../palendrome')('iterative');

describe('Palendrome Recursive Tests', function() {

    describe('Check Base Cases', function () {

        it('Base Case: Word Length = 1', function () {
            expect(palendromeRecursive.isPalendrome('a')).to.equal(true);
        });

        it('Base Case: Word Length = 2, palendrom', function () {
            expect(palendromeRecursive.isPalendrome('aa')).to.equal(true);
        });

        it('Base Case: Word Length = 2, non-palendrome', function () {
            expect(palendromeRecursive.isPalendrome('ab')).to.equal(false);
        });
    });

    describe('Check Recurisve Cases', function () {

        it('Base Case: Word Length = 3, palendrome', function () {
            expect(palendromeRecursive.isPalendrome('aaa')).to.equal(true);
        });

        it('Base Case: Word Length = 3, non-palendrome', function () {
            expect(palendromeRecursive.isPalendrome('abc')).to.equal(false);
        });

        it('Base Case: Word Length = 4, palendrome', function () {
            expect(palendromeRecursive.isPalendrome('aaaa')).to.equal(true);
        });

        it('Base Case: Word Length = 4, non-palendrome', function () {
            expect(palendromeRecursive.isPalendrome('abcd')).to.equal(false);
        });

        it('Base Case: Word Length LONG, palendrome', function () {
            expect(palendromeRecursive.isPalendrome('racecarracecarracecarracecarracecarracecarracecarracecar')).to.equal(true);
        });

        it('Base Case: Word Length = 4, non-palendrome', function () {
            expect(palendromeRecursive.isPalendrome('abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd')).to.equal(false);
        });
    });
});

describe('Palendrome Iterative Tests', function() {

    describe('Check Various Lengths', function () {

        it('Word Length = 1', function () {
            expect(palendromeIterative.isPalendrome('a')).to.equal(true);
        });

        it('Word Length = 2, palendrom', function () {
            expect(palendromeIterative.isPalendrome('aa')).to.equal(true);
        });

        it('Word Length = 2, non-palendrome', function () {
            expect(palendromeIterative.isPalendrome('ab')).to.equal(false);
        });

        it('Word Length = 3, palendrome', function () {
            expect(palendromeIterative.isPalendrome('aaa')).to.equal(true);
        });

        it('Word Length = 3, non-palendrome', function () {
            expect(palendromeIterative.isPalendrome('abc')).to.equal(false);
        });

        it('Word Length = 4, palendrome', function () {
            expect(palendromeIterative.isPalendrome('aaaa')).to.equal(true);
        });

        it('Word Length = 4, non-palendrome', function () {
            expect(palendromeIterative.isPalendrome('abcd')).to.equal(false);
        });

        it('Word Length LONG, palendrome', function () {
            expect(palendromeIterative.isPalendrome('racecarracecarracecarracecarracecarracecarracecarracecar')).to.equal(true);
        });

        it('Word Length = 4, non-palendrome', function () {
            expect(palendromeIterative.isPalendrome('abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd')).to.equal(false);
        });
    });
});