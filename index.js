// function makeDeepCopy(obj) {
//   if (
//     obj === "null" ||
//     typeof obj != "object" ||
//     Array.isArray(obj) ||
//     obj instanceof Set ||
//     obj instanceof Map
//   ) {
//     throw new Error();
//   }

//   let result = {};
//   for (key in obj) {
//     if (typeof obj[key] != "object") {
//       result[key] = obj[key];
//     } else {
//       object[key];
//     }

//     console.log(result);
//     // // }
//   }
//   console.log(result);
// }

// const init = {
//   name: "Samir",
//   contacts: {
//     main: {
//       work: "111",
//       blala: [2, 3, 4],
//     },
//   },
// };
// makeDeepCopy(init);

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

function createProxy(obj) {
  if (!obj || obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error();
  }

  const handler = {
    get(target, prop, receiver) {
      if (prop === "name") {
        return target.name.readAmound++;
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
const obj = {};
const proxy = createProxy(obj); //create proxy
proxy.name = "samir"; //should be allowed
console.log("obj", obj); // should be {name {value:'samir', readAmound:0}}
console.log("proxy", proxy);
proxy.name = null; //should be ignored
proxy.name = "jogn"; // should be allowed

console.log("obj", obj); // should be {name {value:'jogn', readAmound:0}}
console.log("proxy", proxy);
const nameValue = proxy.name;
console.log("obj", obj); // should be {name {value:'jogn', readAmound:1}}
