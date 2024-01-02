class Calculator {
  constructor(num1, num2, ...args) {
    if (!this.isValidNum(num1) || !this.isValidNum(num2) || args.length > 0) {
      throw new Error('Конструктор можеть принять только два валидных числа!')
    }
  }

  isValidNum(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }

  // invalidInput(num1, num2, ...args) {

  // }
}

let calc = new Calculator(1, 2, 3)