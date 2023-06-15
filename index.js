// task 1
class Stack {
  constructor(num) {
    this.maxLenght = !num ? 10 : this.validateArgument(num);
    this.stack = [];
  }
  validateArgument(num) {
    if (!isFinite(num) || num <= 0 || !Number.isInteger(num)) {
      throw new Error("Invalid limit value");
    }
    return num;
  }
  push(elem) {
    if (this.stack.length >= this.maxLenght) {
      throw new Error("Limit exceeded");
    }
    this.stack.push(elem);
  }
  pop() {
    if (this.stack.length === 0) {
      throw new Error("Empty stack");
    }
    this.stack.pop();
  }
  peek() {
    if (this.stack.length === 0) {
      return null;
    }
    return this.stack[this.stack.length - 1];
  }
  isEmpty() {
    return this.stack.length === 0 ? true : false;
  }
  toArray() {
    if (this.stack.length === 0) {
      return 0;
    }
    return this.stack.map((item) => item);
  }
  static fromIterable(iterable) {
    if ((object = null && typeof object[Symbol.iterator] != "function")) {
      throw new Error("Not iterable");
    }
    this.stack = [];
    for (const elem of iterable) {
      this.stack.push(elem);
    }
  }
}
let stack1 = new Stack(3);
console.log(stack1);
// console.log(stack1.stack);
stack1.push("a");
stack1.push("b");

// stack1.pop("c");
console.log(stack1.toArray());
// stack1.push(");
// console.log(stack1);

// task 2
class Node {
  constructor(data, linkToNext) {
    this.data = data;
    this.next = !linkToNext ? null : linkToNext;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    }
    if (!this.tail) {
      this.head.next = newNode;
      this.tail = newNode;
    }
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  prepend(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    }
    if (this.head) {
      newNode.next = this.head;
      this.head = newNode;
    }
  }
  find(data) {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    while (current) {
      if (current.data === data) {
        console.log(current);
        return current;
      }
      current = current.next;
    }
  }
  toArray() {
    const result = [];
    if (!this.head) {
      return result;
    }
    let current = this.head;
    while (current) {
      result.push(current);
      current = current.next;
    }
    return result;
  }

  static(fromIterable) {
    if ((object = null && typeof object[Symbol.iterator] != "function")) {
      throw new Error("Not iterable");
    }
    let newLinkedList = new LinkedList();
    for (const item of fromIterable) {
      const newNode = item;
      newLinkedList.append(newNode);
    }
    return newLinkedList;
  }
}

// task 3
class Car {
  #brand = "";
  #model = "";
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  get brand() {
    return this.#brand;
  }
  set brand(str) {
    if (typeof str != "string" || str.length < 1 || str.length > 50) {
      throw new Error("Invalid brand name");
    }
    this.#brand = str;
  }
  getModel() {
    return this.#model;
  }
  setModel(str) {
    if (typeof str != "string" || str.length < 1 || str.length > 50) {
      throw new Error("Invalid model name");
    }
    this.#brand = str;
  }
  getYearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  setYearOfManufacturing(year) {
    if (
      typeof year != "number" ||
      !isFinite(year) ||
      !Number.isInteger(year) ||
      year < 1950 ||
      year > new Date.getFullYear()
    ) {
      throw new Error("Invalid year of manufacturing");
    }
    this.#yearOfManufacturing = year;
  }
  getMaxSpead() {
    return this.#maxSpeed;
  }
  setMaxSpead(speed) {
    if (
      typeof speed != "number" ||
      !isFinite(speed) ||
      !Number.isInterger(speed) ||
      speed < 100 ||
      speed > 330
    ) {
      throw new Error("Invalid max speed");
    }
    this.#maxSpeed = speed;
  }
  getMaxFuelVolume() {
    return this.#maxFuelVolume;
  }
  setMaxFuelVolume(num) {
    if (
      typeof num != "number" ||
      !isFinite(num) ||
      !Number.isInteger(num) ||
      num < 20 ||
      num > 100
    ) {
      throw new Error("Invalid max fuel volume");
    }
    this.#maxFuelVolume = num;
  }
  getFuelConsumption() {
    return this.#fuelConsumption;
  }
  setFuelConsumption(num) {
    if (
      typeof num != "number" ||
      !isFinite(num) ||
      !Number.isInteger(num) ||
      num > 0
    ) {
      throw new Error("Invalid fuel consumption");
    }
    this.#fuelConsumption = num;
  }
  getDamage() {
    return this.#damage;
  }
  setDamage(num) {
    if (
      typeof num != "number" ||
      !isFinite(num) ||
      !Number.isInteger(num) ||
      num < 1 ||
      num > 5
    ) {
      throw new Error("Invalid damage");
    }
    this.#damage = num;
  }
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }
  get isStarted() {
    return this.#isStarted;
  }
  get health() {
    return this.#health;
  }
  get mileage() {
    return this.#mileage;
  }
  start() {
    if (this.isStarted) {
      throw new Error("Car has already started)");
    }
    this.isStarted = true;
  }
  shutDownEngine() {
    if (!this.isStarted) {
      throw new Error("Car hasn't started yet");
    }
    this.isStarted = false;
  }
  fillUpGasTank(fluel) {
    if (
      typeof fluel != "number" ||
      !isFinite(fluel) ||
      !Number.isInteger(fluel) ||
      fluel <= 0
    ) {
      throw new Error("Invalid fuel amount");
    }
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }
    if (this.#currentFuelVolume + fluel > this.#maxFuelVolume) {
      throw new Error("Too much fuel");
    }
    this.#currentFuelVolume += fluel;
  }
  drive(speed, time) {
    if (!this.#isStarted) {
      throw new Error("You have to start your car first");
    }
    if (
      typeof speed != "number" ||
      !isFinite(speed) ||
      !Number.isInteger(speed) ||
      speed <= 0
    ) {
      throw new Error("Invalid speed");
    }
    if (
      typeof time != "number" ||
      !isFinite(time) ||
      !Number.isInteger(time) ||
      time <= 0
    ) {
      throw new Error("Invalid duration");
    }
    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }
    const fluelConsPer1km = this.#fuelConsumption / 100;
    if (speed * time * fluelConsPer1km > this.#currentFuelVolume) {
      throw new Error("You don't have enough fuel");
    }
    let damagePer1km = this.#damage / 100;
    if (speed * time * damagePer1km > this.#health) {
      throw new Error("Your car won’t make it");
    }
    const fluelCons = fluelConsPer1km * time * speed;
    this.#currentFuelVolume -= fluelCons;
    const helthCons = speed * time * damagePer1km;
    this.#health -= helthCons;
    this.#mileage = speed * time;
  }
  repair() {
    if (this.isStarted) {
      throw new Error("You have to shut down your car first");
    }
    if (this.#currentFuelVolume != this.#maxFuelVolume) {
      throw new Error("You have to fill up your gas tank first");
    }
    this.#health = 100;
  }
  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}
