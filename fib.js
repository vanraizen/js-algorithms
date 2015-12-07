module.exports = function (solutionType) {

    var solutionFunction;

    if (solutionType === 'recursive') {
        solutionFunction = fibRecursive;
    } else if (solutionType === 'iterative') {
        solutionFunction = fibIterative;
    }

    return { fib: solutionFunction };
};

function fibRecursive(n) {
    'use strict';
    var result,
        cache = {};
    if (n <= 0) {
        throw new Error('Invalid Input');
    }
    if (n < 3) {
        return 1;
    }
    result = cache[n] || fibRecursive(n - 1) + fibRecursive(n - 2);
    return result;
}

function fibIterative(n) {
    'use strict';
    var i = 3,
        totalPrev = 1,
        total = 2,
        temp;
    if (n <= 0) {
        throw new Error('Invalid Input');
    }
    if (n < 3) {
        return 1;
    }
    while (i < n) {
        temp = total;
        total = totalPrev + total;
        totalPrev = temp;
        i = i + 1;
    }
    return total;
}