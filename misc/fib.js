module.exports = function (solutionType) {

    var solutionFunction;

    if (solutionType === 'recursive') {
        solutionFunction = fibRecursive;
    } else if (solutionType === 'iterative') {
        solutionFunction = fibIterative;
    }

    return { fib: solutionFunction };
};

/**
 * Because this is a recursive and the way we calculate the fib numbers it's possible that we end up recursively calling
 * our self many times for larger numbers. To avoid jamming the call stack with repeated recursive calls we memoize
 * the results of previous calls so that we have access to the answer without having to call our self again.
 *
 * For example: fib(100) = fib(99) + fib(98)
 * fib(99) calls fib(98) and fib(97)
 * fib(98) calls fib(97) and fib(96)
 *              ...
 * fib(5) calls fib(4) and fib(3) <-- fib(3) on the right hand side should just hit the cache and return early
 * fib(4) calls fib(3) and fib(2) <-- fib(2) returns 1, fib(3) returns 2 and caches value
 * fib(3) calls fib(2) and fib(1) (both of these return 1, cached and we start bubbling up the answer)
 *
 * As you can see the first fib(99) call ends up calling fib(2-98), the fib(98) call ends up calling
 * fib(2-97), every call to fib ends up calling fib(n-1) times so instead of re-calculating all these numbers over and
 * over we can use the result of the first fib(99) call which will fill the cache with fib(3) -> fib(98) so that
 * when we evaluate the right side of the addition we will use previously computed answers instead of recalculating
 * all the answers over and over.
 *
 * @param {Number} n
 * @returns {Number} result
 */
function fibRecursive(n) {
    'use strict';
    var cache = {};
    return fib(n);

    function fib (n) {
        var result;
        if (n <= 0) {
            throw new Error('Invalid Input');
        } else if (n < 3) {
            result = 1;
        } else {
            if (cache[n]) {
                console.log('cache HIT', n);
                result = cache[n];
            } else {
                result = fib(n - 1) + fib(n - 2);
                cache[n] = result;
                console.log('caching', n);
            }
        }
        return result;

    }
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