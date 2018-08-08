function flatten(array) {
  return array.reduce((current, next) => {
    return current.concat(next);
  });
}

function loop(value, testFunction, updateFunction, bodyFunction) {
  while (testFunction(value)) {
    bodyFunction(value);
    value = updateFunction(value);
  }
}

function every(array, test) {
  let isValid = true;
  for (let thing of array) {
    isValid = isValid && test(thing);
  }
  return isValid;
}

function every2(array, test) {
  return !array.some(item => !test(item));
}