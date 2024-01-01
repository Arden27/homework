Array.prototype.myFilter = function myFilter(callbackFn, thisArg) {
	let result = [];

	for (let index = 0; index < this.length; index++) {
		const item = this[index];

		if (callbackFn.call(thisArg, item, index, this)) {
			result.push(item);
		}
	}

	return result;
};
