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
  }
};