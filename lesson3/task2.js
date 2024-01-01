function createDebounceFunction(callbackFn, milliseconds) {
  let result = function() {
    const timeout = setTimeout(() => {
      callbackFn();
    }, milliseconds);
  }
  return result;
}

const fun = () => console.log('hi');

const deb = createDebounceFunction(fun, 1000);

deb()