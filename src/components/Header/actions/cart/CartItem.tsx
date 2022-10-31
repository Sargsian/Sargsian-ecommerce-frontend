import { Component } from 'react';

import classes from './CartItem.module.scss';
import { CartProduct, Currency } from '../../../../models/types';
import ItemActions from './ItemActions';
import ItemAttributes from './ItemAttributes';

type MyProps = {
  cartProduct: CartProduct;
  currency: string;
  currencySymbol?: Currency;
  incrementProduct: (id: number) => void;
  decrementProduct: (id: number) => void;
};

class CartItem extends Component<MyProps> {
  render() {
    const {
      currency,
      currencySymbol,
      cartProduct,
      cartProduct: { product },
      incrementProduct,
      decrementProduct,
    } = this.props;
    const image = product.gallery[0];

    return (
      <div className={classes.item}>
        <div className={classes.itemDetails}>
          <ItemAttributes
            cartProduct={cartProduct}
            currencySymbol={currencySymbol}
            currency={currency}
          />
        </div>
        <div className={classes.itemPreview}>
          <ItemActions
            quantity={cartProduct.quantity}
            incrementProduct={incrementProduct}
            decrementProduct={decrementProduct}
            productId={cartProduct.instanceId}
          />
          <div className={classes.itemImg}>
            <img src={image} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
