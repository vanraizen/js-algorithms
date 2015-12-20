module.exports = {
  bubbleSort: bubbleSort,
  insertionSort: insertionSort,
  mergeSort: mergeSort
};

/**
 * Big O efficiency:
 *
 * Best Case Sort: Merge Sort: O(n)
 * Average Case Sort: Merge Sort: O(n^2)
 * Worst Case Sort: Merge Sort: O(n^2)
 *
 * @param {Array} input
 */
function bubbleSort (input) {
    var movement,
        i,
        end = input.length,
        newEnd;

    while (true) {
        movement = false;
        for(i = 0; i < end; i++) {
            if (input[i] > input[i+1]) {
                swap(i, i+1);
                movement = true;
                newEnd = i;
            }
        }
        end = newEnd;
        if (!movement) {
            break;
        }
    }

    function swap(i1, i2) {
        var temp = input[i1];
        input[i1] = input[i2];
        input[i2] = temp;
    }
}

/**
 * Big O efficiency:
 *
 * Best Case Sort: Merge Sort: O(n)
 * Average Case Sort: Merge Sort: O(n^2)
 * Worst Case Sort: Merge Sort: O(n^2)
 *
 * @param {Array} input
 */
function insertionSort (input) {

    var lastSortedPosition = 0,
        targetPosition,
        elementToInsert;

    while (lastSortedPosition < input.length - 1) {

        targetPosition = lastSortedPosition + 1;

        elementToInsert = input[targetPosition];

        while (elementToInsert < input[targetPosition-1] && targetPosition > 0) {
            --targetPosition;
        }

        if (targetPosition != lastSortedPosition + 1) {

            //remove element to re-insert from array
            input.splice(lastSortedPosition + 1, 1);

            //splice it back into the correct location
            input.splice(targetPosition, 0, elementToInsert);
        }

        ++lastSortedPosition;
    }
}

/**
 * Big O efficiency:
 *
 * Best Case Sort: Merge Sort: O(n)
 * Average Case Sort: Merge Sort: O(n log n)
 * Worst Case Sort: Merge Sort: O(n log n)
 *
 * @param {Array} input
 */
function mergeSort (input) {

    //start by calling itself with the full boundary of the input
    return mergeSort(0, input.length-1);

    function mergeSort (start, end) {

        var left, right, mid, mergedSet;

        //base case, we broke down each half until there's one element left
        if (start == end) {
            return [input[start]];
        }

        //calculate middle
        mid = Math.floor((end + start) / 2);

        //solve each half of the array
        left = mergeSort(start, mid);
        right = mergeSort(mid + 1, end);

        //merge left and right halves
        mergedSet = merge(left, right);

        return mergedSet;

        /**
         * @param {Array} set1
         * @param {Array} set2
         */
        function merge(set1, set2) {

            var mergedSet = [],
                set1Head = 0,
                set2Head = 0;

            //keep building up merged set until length is expected length
            while ( mergedSet.length != (set1.length + set2.length) ) {

                //if set2Head ran over edge or if set1[head] < set2[head], pull from set1
                if (set2[set2Head] === undefined || (set1Head < set1.length && set1[set1Head] < set2[set2Head])) {
                    mergedSet.push(set1[set1Head]);
                    ++set1Head;
                } else {
                    //set1Head ran over edge or set2[head] < set1[head]
                    mergedSet.push(set2[set2Head]);
                    ++set2Head;
                }

            }

            return mergedSet;
        }
    }
}