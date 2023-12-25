function isValidNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

function isValidBase(value) {
  return /^\d+$/.test(value) && value >= 2 && value <= 36;
}

function convertNumberToBase(number, base) {
  return parseFloat(number).toString( parseInt(base) );
}

let number = prompt('Введите число:');
let base = prompt('Введите основание системы счисления (между 2 и 36):');

if (isValidNumber(number) && isValidBase(base)) {
  const result = convertNumberToBase(number, base);
  console.log(result);
} else {
  console.log('Некорректный ввод!');
}
