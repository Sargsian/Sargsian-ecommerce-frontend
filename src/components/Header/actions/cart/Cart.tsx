import { Component } from 'react';
import CartItems from './CartItems';
import { CartProduct } from '../../../../models/types';

import classes from './Cart.module.scss';

type myProps = {
  show: boolean;
  toggleHandler: () => void;
  cartProducts: CartProduct[];
};

class Cart extends Component<myProps> {
  render() {
    const cartProducts = this.props.cartProducts;
    const totalCount = cartProducts.reduce(
      (accum: number, currentValue: CartProduct) => {
        return currentValue.quantity + accum;
      },
      0
    );
    return (
      <>
        <button
          onClick={this.props.toggleHandler}
          className={classes.cartButton}
        >
          {totalCount > 0 && (
            <span className={classes.cartCount}>{totalCount}</span>
          )}
          <img src='/cart.svg' alt='cart' />
        </button>

        {this.props.show && <CartItems
          show={this.props.show}
          toggleHandler={this.props.toggleHandler}
        />}
      </>
    );
  }
}

export default Cart;
