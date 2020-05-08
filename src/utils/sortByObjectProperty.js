// sortType = 1 --> increase, -1 --> decrease
const sortByObjecProperty = (propertyName, objs, sortType = 1) => {
  const compare = (a, b) => {
    if (a[propertyName] < b[propertyName]) {
      return sortType == 1 ? -1 : 1;
    }
    if (a[propertyName] > b[propertyName]) {
      return sortType == 1 ? 1 : -1;
    }
    return 0;
  };

  objs.sort(compare);
};

module.exports = sortByObjecProperty;

// var objs = [
//   { first_nom: 3, last_nom: "Jamf" },
//   { first_nom: 2, last_nom: "Bodine" },
//   { first_nom: 1, last_nom: "Prentice" },
// ];

// sortByObjecProperty("first_nom", objs);
