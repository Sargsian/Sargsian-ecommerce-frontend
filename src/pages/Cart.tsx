import { Component } from 'react';
import classes from './Cart.module.scss';
import ItemAttributes from '../components/Header/actions/cart/ItemAttributes';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import {
  incrementProduct,
  decrementProduct,
} from '../store/reducers/cartSlice';
import { CartProduct, Currency } from '../models/types';
import ItemActions from '../components/Header/actions/cart/ItemActions';
import CartImageSlider from '../components/CartImageSlider';

type MyProps = {
  incrementProduct: (id: number) => void;
  decrementProduct: (id: number) => void;
  cartProducts: CartProduct[];
  currency: string;
  currencyList: Currency[];
};

class Cart extends Component<MyProps> {
  render() {
    const {
      cartProducts,
      incrementProduct,
      decrementProduct,
      currencyList,
      currency,
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

    const quantity = cartProducts.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    const sum = selectedPrice.reduce((accum, currentValue) => {
      return accum + currentValue!.amount;
    }, 0);

    const tax = sum * 0.21;

    return (
      <div className={classes.wrapper}>
        <h1>Cart</h1>
        {cartProducts?.map((cartProduct) => {
          return (
            <div className={classes.product} key={cartProduct.instanceId}>
              <ItemAttributes
                cartProduct={cartProduct}
                currency={currency}
                currencySymbol={currencySymbol}
                cartPage
              />
              <div className={classes.actions}>
                <ItemActions
                  decrementProduct={decrementProduct}
                  incrementProduct={incrementProduct}
                  productId={cartProduct.instanceId}
                  quantity={cartProduct.quantity}
                  cartPage
                />
                <CartImageSlider gallery={cartProduct.product.gallery} />
              </div>
            </div>
          );
        })}

        {cartProducts.length > 0 && (
          <div className={classes.orderDetails}>
            <table>
              <tbody>
                <tr>
                  <td>Tax 21%:</td>
                  <td>
                    {currencySymbol?.symbol || '$'}
                    {tax.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{quantity}</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>
                    {currencySymbol?.symbol || '$'}
                    {sum.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => console.log('order', cartProducts)}>
              Order
            </button>
          </div>
        )}

        {cartProducts.length === 0 && (
          <p className={classes.cartNote}>Your cart is empty.</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  cartProducts: state.cart.products,
  isLoading: state.cart.isLoading,
  currency: state.currency.selectedCurrency,
  currencyList: state.currency.currencyList,
  error: state.cart.error,
});

export default connect(mapStateToProps, { incrementProduct, decrementProduct })(
  Cart
);
