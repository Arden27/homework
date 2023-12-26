function makeObjectDeepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (obj instanceof Date) {
      return new Date(obj.getTime());
  }

  if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags);
  }

  let copy;
  if (Array.isArray(obj)) {
      copy = [];
      for (let i = 0; i < obj.length; i++) {
          copy[i] = makeObjectDeepCopy(obj[i]);
      }
  } else {
      copy = {};
      Object.getOwnPropertyNames(obj).forEach((key) => {
          const propDesc = Object.getOwnPropertyDescriptor(obj, key);
          if (propDesc.hasOwnProperty('value')) {
              propDesc.value = makeObjectDeepCopy(obj[key]);
          }
          Object.defineProperty(copy, key, propDesc);
      });

      Object.getOwnPropertySymbols(obj).forEach((symbol) => {
          const propDesc = Object.getOwnPropertyDescriptor(obj, symbol);
          if (propDesc.hasOwnProperty('value')) {
              propDesc.value = makeObjectDeepCopy(obj[symbol]);
          }
          Object.defineProperty(copy, symbol, propDesc);
      });
  }

  return copy;
}