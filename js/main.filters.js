angular
  .module('tas')
  .filter('objToArr', function () {
    return function (obj) {
      if (obj) {
        return Object.keys(obj).map(function (key) {
          obj[key]['_id'] = key;
          return obj[key];
        });
      }
    };
  })
  .filter('toRansomCase', function () {
    return function (element) {
      return element
        .split('')
        .map(function (char, i) {
          if (i % 2 === 0) {
            return char.toUpperCase();
          } else {
            return char.toLowerCase();
          }
        })
        .join('');
    };
  })
