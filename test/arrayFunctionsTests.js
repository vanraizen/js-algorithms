/*global describe, it*/

var expect = require('chai').expect,
    arrayFunctions = require('../arrayFunctions');

describe('Array Function Tests', function () {

    describe('Test map/reduce', function () {

        it('Best Price For SFO:LAX should be 75', function () {
            expect(arrayFunctions.comparePrices('SFO:LAX')).to.equal(75);
        });

        it('Best Price For SJC:TUC should be 300', function () {
            expect(arrayFunctions.comparePrices('SJC:TUC')).to.equal(300);
        });

        it('Best Price For SFO:LAS should be 50', function () {
            expect(arrayFunctions.comparePrices('SFO:LAS')).to.equal(50);
        });
    });

    describe('Test Array.prototype.some', function () {

        it('Check for any availability of SFO:LAX (should be true)', function () {
            expect(arrayFunctions.flightAvailable('SFO:LAX')).to.equal(true);
        });

        it('Check for any availability of SFO:SAN (should be false)', function () {
            expect(arrayFunctions.flightAvailable('SFO:SAN')).to.equal(false);
        });

        it('Check for any availability of SJC:TUC (should be true)', function () {
            expect(arrayFunctions.flightAvailable('SJC:TUC')).to.equal(true);
        });
    });

    describe('Test Array.prototype.every', function () {

        it('Check for universal availability of SFO:LAX (should be true)', function () {
            expect(arrayFunctions.flightPathUniversallyAvailable('SFO:LAX')).to.equal(true);
        });

        it('Check for universal availability of SJC:TUC (should be false)', function () {
            expect(arrayFunctions.flightPathUniversallyAvailable('SJC:TUC')).to.equal(false);
        });
    });
});
