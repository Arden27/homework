class Car {
	#brand;
	#model;
	#yearOfManufacturing;
	#maxSpeed;
	#maxFuelVolume;
	#fuelConsumption;
	#currentFuelVolume = 0;
	#isStarted = false;
	#mileage = 0;

	get brand() {
		return this.#brand;
	}

	set brand(value) {
		this.#brand = this.#validateProperty(value, 'brand', 'string', 1, 50);
	}

	get model() {
		return this.#model;
	}

	set model(value) {
		this.#model = this.#validateProperty(value, 'model', 'string', 1, 50);
	}

	get yearOfManufacturing() {
		return this.#yearOfManufacturing;
	}

	set yearOfManufacturing(value) {
		this.#yearOfManufacturing = this.#validateProperty(value, 'yearOfManufacturing', 'number', 1900, new Date().getFullYear());
	}

	get maxSpeed() {
		return this.#maxSpeed;
	}

	set maxSpeed(value) {
		this.#maxSpeed = this.#validateProperty(value, 'maxSpeed', 'number', 100, 300);
	}

	get maxFuelVolume() {
		return this.#maxFuelVolume;
	}

	set maxFuelVolume(value) {
		this.#maxFuelVolume = this.#validateProperty(value, 'maxFuelVolume', 'number', 5, 20);
	}

	get fuelConsumption() {
		return this.#fuelConsumption;
	}

	set fuelConsumption(value) {
		this.#fuelConsumption = this.#validateProperty(value, 'fuelConsumption', 'number');
	}

	get currentFuelVolume() {
		return this.#currentFuelVolume;
	}

	get isStarted() {
		return this.#isStarted;
	}

	get mileage() {
		return this.#mileage;
	}

	start() {
		if (this.isStarted === true) {
			throw new Error('Машина уже заведена');
		}

		this.#isStarted = true;
	}

	shutDownEngine() {
		if (this.isStarted === false) {
			throw new Error('Машина ещё не заведена');
		}

		this.#isStarted = false;
	}

	fillUpGasTank(liters) {
		if (this.#isInvalidNum(liters)) {
			throw new Error('Неверное количество топлива для заправки');
		}

		const gasAfterTank = this.currentFuelVolume + liters;

		if (gasAfterTank > this.maxFuelVolume) {
			throw new Error('Топливный бак переполнен');
		}

		this.#currentFuelVolume = gasAfterTank;
	}

	drive(speed, hours) {
		if (this.#isInvalidNum(speed)) {
			throw new Error('Неверная скорость');
		}

    if (this.#isInvalidNum(hours)) {
			throw new Error('Неверное количество часов');
		}

    if (speed > this.maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (this.isStarted !== true) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const fuelForRide = hours * this.fuelConsumption;

    if (fuelForRide > this.currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= fuelForRide;
    this.#mileage += speed * hours;
	}

	#validateProperty(value, propertyName, expectedType, from = null, to = null) {
		if (expectedType === 'number' && this.#isInvalidInput(value, expectedType, from, to)) {
			const range = from !== null && to !== null ? ` от ${from} до ${to}` : '';

			throw new Error(`${propertyName} должно быть валидным числом${range}`);
		}

		if (expectedType === 'string' && this.#isInvalidInput(value, expectedType, from, to)) {
			throw new Error(`${propertyName} должно быть строкой от ${from} до ${to} символов`);
		}

		return value;
	}

	#isInvalidInput(value, expectedType, from, to) {
		return typeof value !== expectedType || this.#isOutOfRange(value, from, to);
	}

	#isOutOfRange(value, from, to) {
		if (typeof value === 'number') {
			return !isFinite(value) || (from !== null && value < from) || (to !== null && value > to);
		}

		if (typeof value === 'string') {
			return value.length < from || value.length > to;
		}
	}

	#isInvalidNum(value) {
		return typeof value !== 'number' || !isFinite(value) || value <= 0;
	}
}