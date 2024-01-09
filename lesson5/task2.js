class LinkedList {
	#start;
	#end;

	constructor() {
		this.#start = null;
		this.#end = null;
	}

	static Node = class {
		constructor(value) {
			this.value = value;
			this.next = null;
		}
	};

	append(value) {
		const prevEnd = this.#end;
		const newNode = new LinkedList.Node(value);

		if (prevEnd === null) {
			this.#start = newNode;
		} else {
      prevEnd.next = newNode;
    }

		this.#end = newNode;
	}

	prepend(value) {
		const prevStart = this.#start;
		const newNode = new LinkedList.Node(value);

		newNode.next = prevStart;
		this.#start = newNode;

		if (newNode.next === null) {
			this.#end = newNode;
		}
	}

  find(searchedValue) {
    let currentNode = this.#start;

    while (currentNode !== null ) {
      if (currentNode.value === searchedValue) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

	toArray() {
		let resultArr = [];
		let currentNode = this.#start;

		while (currentNode !== null) {
			resultArr.push(currentNode.value);
			currentNode = currentNode.next;
		}

		return resultArr;
	}

  static fromIterable(iterable) {
    if (LinkedList.#isNotIterable(iterable)) {
      throw new Error('Переданный объект неитерируемый!');
    }

    const linkedList = new LinkedList();

    for (const item of iterable) {
      linkedList.append(item);
    }

    return linkedList;
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