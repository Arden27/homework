class Calculator {
	constructor(x, y, ...args) {
		if (this.isInvalidInput(x, y, ...args)) {
			throw new Error('Конструктор ожидает два валидных числа');
		}

		this.x = x;
		this.y = y;

		this.setX = this.setX.bind(this);
		this.setY = this.setY.bind(this);
		this.logSum = this.logSum.bind(this);
		this.logMul = this.logMul.bind(this);
		this.logSub = this.logSub.bind(this);
		this.logDiv = this.logDiv.bind(this);
	}

	setX(num) {
		if (this.isInvalidNum(num)) {
			throw new Error('Невалидное число');
		}
    
		this.x = num;
	}

	setY(num) {
		if (this.isInvalidNum(num)) {
			throw new Error('Невалидное число');
		}

		this.y = num;
	}

	logSum() {
		console.log(this.x + this.y);
	}

	logMul() {
		console.log(this.x * this.y);
	}

	logSub() {
		console.log(this.x - this.y);
	}

	logDiv() {
		if (this.y === 0) {
			throw new Error('Нельзя делить на ноль');
		}

		console.log(this.x / this.y);
	}

	isInvalidNum(value) {
		return typeof value !== 'number' || isNaN(value) || !isFinite(value);
	}

	isInvalidInput(x, y, ...args) {
		return this.isInvalidNum(x) || this.isInvalidNum(y) || args.length > 0;
	}
}