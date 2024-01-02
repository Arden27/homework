function concatStrings(str, separator) {
	if (typeof separator !== 'string') {
		separator = '';
	}

	return (nextStr) => {
		if (typeof nextStr !== 'string') {
			return str;
		}

		return concatStrings(str + separator + nextStr, separator);
	};
}