function createDebounceFunction(callbackFn, milliseconds) {
	let timer;

	return function () {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callbackFn();
		}, milliseconds);
	};
}
