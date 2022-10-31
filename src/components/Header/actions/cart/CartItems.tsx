import { Component } from 'react';
import Backdrop from '../../../Backdrop';
import CartItem from './CartItem';
import { RootState } from '../../../../store/store';
import { connect } from 'react-redux';
import { CartProduct, Currency } from '../../../../models/types';
import { Link } from 'react-router-dom';
import {
  incrementProduct,
  decrementProduct,
} from '../../../../store/reducers/cartSlice';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import classes from './CartItems.module.scss';

type MyProps = {
  show: boolean;
  toggleHandler: () => void;
  incrementProduct: (id: number) => void;
  decrementProduct: (id: number) => void;
  cartProducts: CartProduct[];
  currency: string;
  currencyList: Currency[];
};

class CartItems extends Component<MyProps> {
  componentDidMount = () => {
    if (window.innerWidth <= 520) {
      document.body.style.overflowY = 'hidden';
    }
  };

  componentWillUnmount = () => {
    if (window.innerWidth <= 520) {
      document.body.style.overflowY = 'auto';
    }
  };

  render() {
    const {
      cartProducts,
      currency,
      currencyList,
      toggleHandler,
      incrementProduct,
      decrementProduct,
    } = this.props;

    const currencySymbol = currencyList.find(
      (price) => price.label === currency
    );

    const selectedPrice = cartProducts.map((item) => {
      const productPrice = item.product.prices.find((price) => {
        if (!currencySymbol) {
          return price.currency.label === 'USD';
        }
        return price.currency.label === currency;
      });
      if (item.quantity > 1) {
        return {
          ...productPrice,
          amount: productPrice!.amount * item.quantity,
        };
      } else {
        return productPrice;
      }
    });

    const totalSum = selectedPrice.reduce((accum, currentValue) => {
      return accum + currentValue!.amount;
    }, 0);

    return (
      <Backdrop
        opacity={true}
        show={this.props.show}
        showHandler={toggleHandler}
      >
        <div
          className={`${classes.cartContainer} ${
            this.props.show ? classes.showCart : ''
          }`}
        >
          <div className={classes.itemsWrapper}>
            <div className={classes.bagInfo}>
              <h3>My Bag{cartProducts.length > 0 && ','}</h3>
              &nbsp;
              <span>
                {cartProducts.length > 0 &&
                  `${cartProducts.length} product${
                    cartProducts.length === 1 ? '' : 's'
                  }`}
              </span>
            </div>
            <div className={classes.items}>
              <SimpleBar
                style={{
                  maxHeight: '100%',
                }}
              >
                <div className={classes.itemsChildren}>
                  {cartProducts.map((product, i) => {
                    return (
                      <CartItem
                        key={i}
                        cartProduct={product}
                        currencySymbol={currencySymbol}
                        currency={currency}
                        incrementProduct={incrementProduct}
                        decrementProduct={decrementProduct}
                      />
                    );
                  })}
                </div>
              </SimpleBar>
            </div>
            {cartProducts.length === 0 && (
              <p className={classes.cartNote}>Your cart is empty..</p>
            )}
            <div className={classes.priceAmount}>
              <h3>Total</h3>
              <h3>
                {currencySymbol?.symbol || '$'}
                {totalSum.toFixed(2)}
              </h3>
            </div>
          </div>
          <div className={classes.cta}>
            <Link to={'/cart'}>
              <button onClick={toggleHandler}>View Bag</button>
            </Link>
            <button onClick={() => console.log('order', cartProducts)}>
              Check Out
            </button>
          </div>
        </div>
      </Backdrop>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cartProducts: state.cart.products,
  isLoading: state.cart.isLoading,
  error: state.cart.error,
  currency: state.currency.selectedCurrency,
  currencyList: state.currency.currencyList,
});

export default connect(mapStateToProps, { incrementProduct, decrementProduct })(
  CartItems
);
