module.exports = function (solutionType) {

    var solutionFunction;

    if (solutionType === 'recursive') {
        solutionFunction = isPalendromeRecursive;
    } else if (solutionType === 'iterative') {
        solutionFunction = isPalendromeIterative;
    }

    return { isPalendrome: solutionFunction };
};

function isPalendromeRecursive (word) {
    //base cases: if word is length 1 or 2 then it's a simple check
    if(word.length == 1) {
        return true;
    } else if (word.length == 2) {
        return word[0] === word[1];
    } else {
        //if the word length > 2 then we can efficiently check the edges
        if(word[0] === word[word.length-1]) {
            //if edges match then rerun this function checking the inner word with edges shrunk by 1
            var subString = word.substr(1, word.length - 2);
            //console.log('checking substring: ', subString);
            return isPalendromeRecursive(subString);
        }
        //if edges do not match then there is no need to continue, break with a false
        return false;
    }
}

function isPalendromeIterative (word) {

    var i,
        rightEdge = word.length - 1,
        halfWay = word.length / 2;
    for(i = 0; i < halfWay; i++) {
        if (word[i] !== word[rightEdge]) {
            return false;
        }
        rightEdge--;
    }
    return true;
}