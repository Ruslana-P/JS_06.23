function getDistance(x1, y1, x2, y2) {
  const args = [...arguments];
  if (args.length != 4) {
    throw new Error("Please pass 4 arguments");
  }
  [...arguments].forEach((item) => {
    if (!isFinite(item) || item < -1000 || item > 1000 || item == null) {
      throw new Error("One of arguments is not valid");
    }
  });

  let result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  if (!Number.isInteger(result)) {
    result = +result.toFixed(2);
  }
  return result;
}

function switchPlaces(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Passed argument is not array");
  }

  if (arr.length === 0) {
    return arr;
  }

  const middle = arr.length / 2;
  let result;

  if (Number.isInteger(middle)) {
    const arr1 = arr.slice(0, middle);
    const arr2 = arr.slice(middle, arr.length);
    result = [...arr2, ...arr1];
  } else {
    const arr1 = arr.slice(0, middle);
    const arr2 = arr.slice(middle, middle + 1);
    const arr3 = arr.slice(middle + 1, arr.length);
    result = [...arr3, ...arr2, ...arr1];
  }
  return result;
}

function getDivisors(num) {
  if (!isFinite(num) || num == null) {
    throw new Error("Please pass a number");
  }
  let result = [];
  for (let i = num; i > 0; i--) {
    if (Number.isInteger(num / i)) {
      result.push(i);
    }
  }
  return result;
}
