class Stack {
	#maxSize;
	#currentSize;
	#top;

	constructor(maxSize = 10) {
		if (this.#isInvalidNum(maxSize)) {
			throw new Error('Невалидный размер стека');
		}

		this.#maxSize = maxSize;
		this.#currentSize = 0;
		this.#top = null;
	}

	static #Node = class {
		constructor(value) {
			this.value = value;
			this.next = null;
		}
	};

	push(value) {
		if (this.#isFull()) {
			throw new Error('Стек переполнен');
		}

		const newNode = new Stack.#Node(value);

		newNode.next = this.#top;
		this.#top = newNode;
		this.#currentSize++;
	}

	pop() {
		if (this.#top === null) {
			throw new Error('Нельзя удалить элемент, стек пуст');
		}

		const poppedNode = this.#top;
		
		this.#top = this.#top.next;
		this.#currentSize--;

		return poppedNode.value;
	}

	peek() {
		if (this.isEmpty()) {
			return null;
		}

		return this.#top.value;
	}

	isEmpty() {
		return this.#top === null;
	}

	toArray() {
		let resultArr = [];
		let currentNode = this.#top;

		while (currentNode !== null) {
			resultArr.push(currentNode.value);
			currentNode = currentNode.next;
		}

		return resultArr;
	}

	#isInvalidNum(value) {
		return typeof value !== 'number' || value < 0 || isNaN(value) || !isFinite(value);
	}

	#isFull() {
		return this.#maxSize === this.#currentSize;
	}

	static fromIterable(iterable) {
		if (Stack.#isNotIterable(iterable)) {
			throw new Error('Переданный объект неитерируемый');
		}

		const stack = new Stack(0);

		for (const item of iterable) {
			stack.#maxSize++;
			stack.push(item);
		}

		return stack;
	}

	static #isNotIterable(obj) {
		try {
			for (const _ of obj) {
				break;
			}

			return false;
		} catch (e) {
			return true;
		}
	}
}
