//task 1
function makeDeepCopy(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error();
  } else {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value != "object") {
        result[key] = value;
      } else {
        result[key] = copyObject(value);
      }
    }
    return result;
  }
}

function copyObject(obj) {
  if (typeof obj != "object") {
    return obj;
  } else if (Array.isArray(obj)) {
    const newObj = obj.map((item) => {
      if (typeof item != "object") {
        return item;
      } else {
        return copyObject(item);
      }
    });
    return newObj;
  } else if (obj instanceof Map) {
    const newObj = new Map();
    for (const [key, value] of Object.entries(obj)) {
      newObj.set(key, copyObject(value));
    }
    return newObj;
  } else if (obj instanceof Set) {
    const newObj = new Set();
    for (const value of Object.values(obj)) {
      newObj.add(cloneObject(value));
    }
    return newObj;
  } else {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value != "object") {
        result[key] = value;
      } else {
        result[key] = copyObject(value);
      }
    }
    return result;
  }
}

// task 2
function createIterable(from, to) {
  if (from >= to || !to || !from) {
    throw new Error();
  }
  [...arguments].forEach((item) => {
    if (!isFinite(item) || typeof item != "number" || !Number.isInteger(item)) {
      throw new Error();
    }
  });
  return (obj = {
    from: from,
    to: to,

    [Symbol.iterator]: function () {
      return {
        current: this.from,
        last: this.to,
        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  });
}

// task 3
function createProxy(obj) {
  if (!obj || obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error();
  }

  const handler = {
    get(target, prop, receiver) {
      if (prop === "name") {
        target[prop].readAmound++;
        return target[prop];
      }
    },

    set: function (target, prop, value) {
      if (!target[prop]) {
        return (target[prop] = { value: value, readAmound: 0 });
      } else if (value === null) {
        return (target[prop] = { value: null, readAmound: 0 });
      } else {
        let v =
          typeof target[prop].value === typeof value ||
          target[prop].value === null
            ? value
            : target[prop].value;
        return (target[prop] = { value: v, readAmound: 0 });
      }
    },
  };
  return new Proxy(obj, handler);
}
