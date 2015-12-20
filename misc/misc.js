module.exports = {
    listDuplicatesInArray: function(arrInput) {
      var countMap = {},
          duplicates = [];
      arrInput.forEach(function (e) {
          countMap[e] = countMap[e] ? countMap[e] + 1 : 1;
          if(countMap[e] > 1 && duplicates.indexOf(countMap[e]) == -1) {
              duplicates.push(e);
          }
      });
      return duplicates;
    },
    binarySearch: function(input, searchTerm) {
      input.sort(function(a, b) { return Number(a) - Number(b) });
      return search(0, input.length - 1);
      function search(start, end) {
          if (start > end) {
              return false;
          }
          var middleIndex = Math.floor((end + start) / 2),
              middleElement = input[middleIndex];
          //console.log("searching from index ", start, " => ", end, ", middle[", middleIndex, "] => ", middleElement, input);
          if(searchTerm === middleElement) {
              return true;
          } else if(searchTerm > middleElement) {
              return search(middleIndex + 1, end);
          } else if(searchTerm < middleElement) {
              return search(start, middleIndex - 1);
          }
      }
    },
    listDuplicatesInString: function (string1, string2, useTimeEfficientSolution) {
        var stringWithDuplicates = "";

        if(useTimeEfficientSolution) {
            moreEfficientSolution();
        } else {
            lessEfficientSolution();
        }

        return stringWithDuplicates.split("").sort().join("");

        //this runs in O(n^2) time
        function lessEfficientSolution() {
            var i;
            for (i = 0; i < string1.length; i++) {
                if(string2.indexOf(string1[i]) !== -1 && stringWithDuplicates.indexOf(string1[i]) == -1) {
                    stringWithDuplicates += string1[i];
                }
            }
        }

        //this runs in O(n) time
        function moreEfficientSolution() {
            var characterMap = {},
                i,
                duplicateMap = {};
            for (i = 0; i < string1.length; i++) {
                characterMap[string1[i]] = true;
            }
            for (i = 0; i < string2.length; i++) {
                if(characterMap[string2[i]]) {
                    duplicateMap[string2[i]] = true;
                }
            }
            stringWithDuplicates = Object.keys(duplicateMap).join("");
        }
    }
};

//14,3:  14 = 1110,   1 (110) -> 1(011) = 11
//function reverseLastNBits(number, bitsToReverse) {}