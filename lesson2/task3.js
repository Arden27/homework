const myIterable = {
  from: 2,
  to: 9,

  isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  },

  isFromToValidNumbers() {
    return this.isValidNumber(this.from) && this.isValidNumber(this.to);
  },

  [Symbol.iterator]() {
    if (!this.isFromToValidNumbers()) {
      throw new Error('from и to должны быть числами');
    }
    if (this.to < this.from) {
      throw new Error('to должно быть больше или равно from');
    }

    let currentValue = this.from;
    return {
      next: () => {
        if (currentValue <= this.to) {
          return { value: currentValue++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};