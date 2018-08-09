class Vec {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vec(this.x - vector.x, this.y -vector.y);
  }

  get length() {
    return Math.sqrt((this.x*this.x) + (this.y * this.y));
  }
}

class Group {
  constructor(){
    this.values = [];
  }

  add(element){
    if (!this.has(element)) {
      this.values.push(element);
    }
  }

  delete(element){
    if(this.has(element)) {
      delete this.values[this.values.indexOf(element)];
    }
  }

  has(element){
    if(this.values.indexOf(element) > -1) {
      return true;
    } else {
      return false;
    }
  }

  static from(iterable) {
    let group = new Group();
    for (let element of iterable) {
      group.add(element);  
    }
    return group;
  }

  Symbol.iterator = function() {
    return new GroupIterator(this);
  };
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.element = null;
  }

  next() {
    if (!this.group.has(this.element)) return {done: true};

    let value = {value: this.group[this.group.values.indexOf(this.element)]
                 group: this.group.delete(this.group.values[0]);
    }
    return {value, done:false};
  }
}