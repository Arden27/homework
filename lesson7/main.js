document.addEventListener('DOMContentLoaded', (event) => {
	const buttonsContainer = document.getElementById('calculator-buttons');
	const mainDisplay = document.getElementById('main-display');
	const historyDisplay = document.getElementById('history-display');
	const memoryDisplay = document.getElementById('memory-display');

	const currOperation = {
		a: '0',
		b: '',
		operator: '',
		result: '',
	};
	const prevOperation = {
		a: '',
		b: '',
		operator: '',
		result: '',
	};
	let operationHistory = [];
	let memoryValue = 0;
	let wasCalculated = false;

	const operate = (leftOperand, rightOperand, operator) => {
		if (!leftOperand || !rightOperand || !operator) {
			throw new Error();
		}

		const leftNumber = parseFloat(leftOperand);
		const rightNumber = parseFloat(rightOperand);
		let result;

		switch (operator) {
			case '+':
				result = leftNumber + rightNumber;
				break;
			case '-':
				result = leftNumber - rightNumber;
				break;
			case '×':
				result = leftNumber * rightNumber;
				break;
			case '÷':
				if (rightNumber === 0) {
					throw new Error('Нельзя делить на 0!');
				}

				result = leftNumber / rightNumber;
				break;
		}

		return parseFloat(result.toFixed(8));
	};

	const handleDigit = (value) => {
		if (wasCalculated) {
			currOperation.a = '';
			currOperation.b = '';
			currOperation.operator = '';
			currOperation.result = '';
			wasCalculated = false;
		}

		if (currOperation.operator) {
			currOperation.b = currOperation.b === '0' ? value : currOperation.b + value;
			prevOperation.b = currOperation.b;
		} else if (wasCalculated) {
			currOperation.a = value;
			wasCalculated = false;
		} else {
			currOperation.a = currOperation.a === '0' ? value : currOperation.a + value;
			prevOperation.a = currOperation.a;
		}

		updateDisplay();
	};

	const updateDisplay = (value) => {
		let displayText = '';

		if (value) {
			displayText = value;
		} else {
			displayText = `${currOperation.a}${currOperation.operator}${formatOperand(currOperation.b)}`;
		}

		mainDisplay.textContent = displayText;
		historyDisplay.innerHTML = operationHistory.join('<br>');
	};

	const formatOperand = (operand) => {
		return operand.startsWith('-') ? `(${operand})` : operand;
	};

	const handleOperatorChange = (value) => {
		if (operationUnfinished()) {
			calculateResult();
		}

		if (wasCalculated) {
			currOperation.a = prevOperation.result;
			currOperation.b = '';
			wasCalculated = false;
		}

		currOperation.operator = value;
		prevOperation.operator = currOperation.operator;

		updateDisplay();
	};

	const operationUnfinished = () => {
		return !wasCalculated && currOperation.a && currOperation.b && currOperation.operator;
	};

	const addDecimal = () => {
		if (currOperation.operator) {
			if (!currOperation.b.includes('.')) {
				currOperation.b = currOperation.b === '' ? '0.' : currOperation.b + '.';
				prevOperation.b = currOperation.b;
			}
		} else if (wasCalculated) {
			currOperation.a = '0.';
			wasCalculated = false;
		} else if (!currOperation.a.includes('.')) {
			currOperation.a = currOperation.a === '' ? '0.' : currOperation.a + '.';
			prevOperation.a = currOperation.a;
		}

		updateDisplay();
	};

	const toggleSign = () => {
		if (currOperation.b) {
			currOperation.b = currOperation.b.startsWith('-') ? currOperation.b.substring(1) : `-${currOperation.b}`;
		} else {
			currOperation.a = currOperation.a.startsWith('-') ? currOperation.a.substring(1) : `-${currOperation.a}`;
		}

		updateDisplay();
	};

	const calculateResult = () => {
		let result;

		try {
			if (!wasCalculated) {
				const operandB = currOperation.b === '' ? currOperation.a : currOperation.b;

				result = operate(currOperation.a, operandB, currOperation.operator);
				operationHistory.unshift(`${currOperation.a}${currOperation.operator}${formatOperand(operandB)}=${formatOperand(String(result))}`);
				prevOperation.a = currOperation.a;
				prevOperation.b = operandB;
				prevOperation.operator = currOperation.operator;
			} else {
				result = operate(currOperation.a, prevOperation.b, prevOperation.operator);
				operationHistory.unshift(`${currOperation.a}${prevOperation.operator}${formatOperand(prevOperation.b)}=${formatOperand(String(result))}`);
			}
		} catch (error) {
			if ((error.message = 'Недостаточно аргументов')) {
				return;
			}

			mainDisplay.textContent = error.message;
			return;
		}

		prevOperation.result = String(result);
		currOperation.a = String(result);
		currOperation.b = '';
		currOperation.operator = '';
		wasCalculated = true;

		updateDisplay(result);
	};

	const clearAll = () => {
		currOperation.a = '0';
		currOperation.b = '';
		currOperation.operator = '';
		operationHistory = [];
		updateDisplay();
	};

	const updateMemory = (type) => {
		if (operationUnfinished()) {
			calculateResult();
		}

		const updateOperator = type === 'M+' ? 1 : -1;

		if (currOperation.b) {
			memoryValue += parseFloat(currOperation.b) * updateOperator;
		} else {
			memoryValue += parseFloat(currOperation.a) * updateOperator;
		}

		memoryDisplay.textContent = memoryValue;
	};

	const memoryRecall = () => {
		if (currOperation.operator) {
			currOperation.b = String(memoryValue);
		} else {
			currOperation.a = String(memoryValue);
			wasCalculated = false;
		}

		updateDisplay();
	};

	const memoryClear = () => {
		memoryValue = 0;
		memoryDisplay.textContent = parseFloat(memoryValue);
	};

	const undoTyping = () => {
		const onlyMinusLeft = (operand) => {
			return operand[operand.length - 1] === '-';
		};

		if (currOperation.b) {
			currOperation.b = currOperation.b.slice(0, -1);

			if (onlyMinusLeft(currOperation.b)) {
				currOperation.b = '';
			}
		} else if (currOperation.operator) {
			currOperation.operator = '';
		} else {
			if (currOperation.a === '0') {
				return;
			}

			currOperation.a = currOperation.a.slice(0, -1);

			if (onlyMinusLeft(currOperation.a)) {
				currOperation.a = '0';
			}
		}

		updateDisplay();
	};

	const handleClick = (event) => {
		if (event.target.nodeName === 'BUTTON') {
			const buttonText = event.target.textContent;

			switch (buttonText) {
				case '+':
				case '-':
				case '×':
				case '÷':
					handleOperatorChange(buttonText);
					break;
				case '.':
					addDecimal();
					break;
				case '+/-':
					toggleSign();
					break;
				case 'C':
					clearAll();
					break;
				case '=':
					calculateResult();
					break;
				case 'M+':
				case 'M-':
					updateMemory(buttonText);
					break;
				case 'MR':
					memoryRecall();
					break;
				case 'MC':
					memoryClear();
					break;
				case '→':
					undoTyping();
					break;
				default:
					handleDigit(buttonText);
			}
		}
	};

	buttonsContainer.addEventListener('click', handleClick);
});
