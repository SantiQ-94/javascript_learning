class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
      return a*b;
  } else {
      throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a,b) {
  for (;;) {
    try {
      var result = primitiveMultiply(a, b);
      break;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log(e);
      } else {
          throw e;
      }
    }
  }
  return result;
}

const box = {
  locked: true;
  unlock() { this.locked = false; },
  lock() { this.locked = true; },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(fun) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }
  
  box.unlock();
  try {
    return fun();
  } finally {
    box.lock();
  }
}


