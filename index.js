// task 1
Array.prototype.customFilter = function (func, obj) {
  if (!func || typeof func != "function") {
    throw new Error("Invalid argument.");
  }
  if (
    obj &&
    (typeof obj != "object" ||
      obj === null ||
      obj instanceof Map ||
      obj instanceof Set)
  ) {
    throw new Error("Invalid argument.");
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (func.call(obj, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

//task 2
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Invalid argument.");
  }
  if (arr.lenght === 0) {
    return [];
  }
  arr.forEach((item) => {
    if (!isFinite(item) || typeof item != "number") {
      throw new Error("Invalid argument.");
    }
  });
  let result = arr.map((item) => item);
  bubbleSortInner(result);
  return result;
}

function bubbleSortInner(result) {
  let changed = false;
  for (let i = 0, len = result.length - 1; i < len; i++) {
    if (result[i] > result[i + 1]) {
      let tempVar = result[i];
      result[i] = result[i + 1];
      result[i + 1] = tempVar;
      changed = true;
    }
  }
  if (changed === true) {
    bubbleSortInner(result);
  }
}

//task 3
function storageWrapper(calback, arr) {
  if (!calback || typeof calback != "function") {
    throw new Error("Invalid argument.");
  }
  if (arr && !Array.isArray(arr)) {
    throw new Error("Invalid argument.");
  }
  let result = arr ? arr : [];
  return function () {
    result.push(calback());
    return result;
  };
}
