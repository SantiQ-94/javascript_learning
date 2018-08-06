/*
  On this document `List` is defined as an object with the next structure
    
    list = {value: `value`, rest: list/null}
  
*/

function range(start, end, step = 1) {
  let array =[], i = start;
  if (step > 0) {
    while (i <= end) {
      array.push(i);
      i += step;
    }
  } else {
    while (i >= end) {
      array.push(i);
      i += step;
    }
  }
  return array;
}

function sum(numbers) {
  let total = 0;
  for (let number of numbers) {
    total += number;
  }
  return total;
}

function reverseArray(array) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    newArray.unshift(array[i]);
  }
  return newArray;
}

function reverseArrayInPlace(array) {
  let i = array.length, newArray = [];
  for (let j = 0; j < i; j++) {
    newArray.push(array.pop());
  }
  for (let j = 0; j < newArray.length; j++) {
    array.unshift(newArray[i-j-1]);
  }
}

function arrayToList(array) {
  if (array.length == 0) {
    return undefined;
  } else if (array.length == 1) {
    return {value: array[0], rest: null};
  } else {
    return {value: array.shift(), rest: arrayToList(array)};
  }
}

function listToArray(list) {
  let array = [];
  array.push(list.value); 
  if (list.rest != null) {
    return array.concat(listToArray(list.rest));
  }
  return array;
}

function prepend(element, list) {
  return {value: element, rest: list};
}

function nth(list, index) {
  if (list.rest == null && index > 0) {
    return undefined;
  } else if (list.rest != null && index > 0) {
    return nth(list.rest, index-1);
  } else if (index == 0) {
    return list.value;
  }
}

/*
  
  To be completed yet!

function deepEqual(obj_a, obj_b) {
  if (obj_a == null || obj_b == null) {
    console.log('one of the objects is null')
    return undefined;
  } else if ((typeof(obj_a) == "object") && (typeof(obj_b) == "object")) {
    let keys_a = obj_a.keys(), keys_b = obj_b.keys();
    let answer = true;
    if (keys_a.length != keys_b.length) {
      return false;
    } else {
      for (let i = 0; i < keys_a.length; i++) {
        answer = answer && deepEqual(obj_a[i], obj_b[i]);    
      }
      return answer;
    }
  } else {
    return obj_a === obj_b;
  }
}*/