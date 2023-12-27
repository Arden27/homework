function isValidNumber(value) {
	return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

function isValidData(array, a, b) {
	return Array.isArray(array) && isValidNumber(a) && isValidNumber(b);
}

function selectFromInterval(array, a, b) {
	if (!isValidData(array, a, b)) {
		throw Error('Неправильные входные данные');
	}

	if (a > b) {
		[a, b] = [b, a];
	}

	let filteredArray = [];
	for (const item of array) {
		if (!isValidNumber(item)) {
			throw new Error('Все элементы массива должны быть числами');
		}
		if (item >= a && item <= b) {
			filteredArray.push(item);
		}
	}
	return filteredArray;
}