import { CartProduct } from '../models/types';

const isObject = (object: Object) => {
  return object != null && typeof object === 'object';
};

export const compare = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects) continue;
    if (val1 !== val2) {
      return false;
    }
  }
  return true;
};

export const shallowComparison = (
  products: CartProduct[],
  newProduct: CartProduct
) => {
  
  for (let i = 0; i < products.length; i++) {
    if (
      compare(
        { ...products[i], quantity: 0, instanceId: 0 },
        { ...newProduct, quantity: 0, instanceId: 0 }
      )
    ) {
      return true;
    }
  }
  return false;
};
