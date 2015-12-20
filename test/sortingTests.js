var expect = require('chai').expect,
    sorting = require('../misc/sorting');

describe('Sorting Tests', function() {

    var smallSetUnsorted,
        largeSetUnsorted = [],
        inputSmallSorted,
        inputLargeSorted,
        inputSmall,
        inputLarge;

    before(function () {
        smallSetUnsorted = [-1, 0, 2, 4, 100, 78, 23, 12];
        inputSmallSorted = smallSetUnsorted.slice().sort(function(a, b) { return a - b });

        var i;
        for (i = 0; i < 1000; i++) {
            largeSetUnsorted.push(Number((Math.random()*1000).toFixed(2)));
        }

        inputLargeSorted = largeSetUnsorted.slice().sort(function(a, b) { return a - b });
    });

    beforeEach(function() {
        inputSmall = smallSetUnsorted.slice();
        inputLarge = largeSetUnsorted.slice();
    });

    describe('Bubble Sort', function () {
        it('Small Set', function () {
            sorting.bubbleSort(inputSmall);
            expect(inputSmall).to.eql(inputSmallSorted);
        });
        it('Large Set', function () {
            sorting.bubbleSort(inputLarge);
            expect(inputLarge).to.eql(inputLargeSorted);
        });
    });

    describe('Insertion Sort', function () {
        it('Small Set', function () {
            sorting.insertionSort(inputSmall);
            expect(inputSmall).to.eql(inputSmallSorted);
        });
        it('Large Set', function () {
            sorting.insertionSort(inputLarge);
            expect(inputLarge).to.eql(inputLargeSorted);
        });
    });

    describe('Merge Sort', function () {
        it('Small Set', function () {
            expect(sorting.mergeSort(inputSmall)).to.eql(inputSmallSorted);
        });
        it('Large Set', function () {
            expect(sorting.mergeSort(inputLarge)).to.eql(inputLargeSorted);
        });
    });
});