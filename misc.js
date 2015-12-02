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
  }
};