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
