function isValidNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

let firstValue = prompt('Введите первое число:');
if ( !isValidNumber(firstValue) ) {
  console.log('Некорректный ввод!');
} else {
  let secondValue = prompt('Введите второе число:');
  if ( !isValidNumber(secondValue) ) {
      console.log('Некорректный ввод!');
  } else {
      firstValue = parseFloat(firstValue);
      secondValue = parseFloat(secondValue);

      let sum = firstValue + secondValue;
      let quotient = (secondValue !== 0) ? firstValue / secondValue : 'деление на ноль';

      console.log(`Ответ: ${sum}, ${quotient}.`);
  }
}
