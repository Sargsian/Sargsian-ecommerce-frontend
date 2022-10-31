import { Component } from 'react';

import classes from './ItemActions.module.scss';

type MyProps = {
  quantity: number;
  productId: number;
  cartPage?: boolean;
  incrementProduct: (id: number) => void;
  decrementProduct: (id: number) => void;
};

class ItemActions extends Component<MyProps> {
  render() {
    const {
      quantity,
      productId,
      cartPage,
      incrementProduct,
      decrementProduct,
    } = this.props;

    return (
      <div
        className={
          cartPage
            ? `${classes.actions} ${classes.cartPageActions}`
            : classes.actions
        }
      >
        <button onClick={() => incrementProduct(productId)}>
          <span></span>
        </button>
        <span>{quantity}</span>
        <button onClick={() => decrementProduct(productId)}>
          <span></span>
        </button>
      </div>
    );
  }
}

export default ItemActions;
