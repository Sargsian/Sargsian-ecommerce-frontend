import { Component } from 'react';
import { connect } from 'react-redux';
import { CartProduct, Currency as CurrencyType } from '../../../models/types';
import { RootState } from '../../../store/store';
import { fetchCurrency } from '../../../store/reducers/currencyActions';
import { switchCurrency } from '../../../store/reducers/currencySlice';
import Currency from './currency/Currency';
import Cart from './cart/Cart';

import classes from './Actions.module.scss';

type MyProps = {
  switchCurrency: (currency: string) => void;
  fetchCurrency: () => void;
  currencyToggleHandler: () => void;
  cartToggleHandler: () => void;
  currencyList: CurrencyType[];
  selectedCurrency: string;
  cartProducts: CartProduct[];
  showCurrency: boolean;
  showCart: boolean;
};

type MyState = {
  showCurrency: boolean;
  showCart: boolean;
};

class Actions extends Component<MyProps, MyState> {
  componentDidMount = async () => {
    this.props.fetchCurrency();
  };

  render() {
    const {
      cartToggleHandler,
      currencyToggleHandler,
      switchCurrency,
      selectedCurrency,
      cartProducts,
      showCart,
      showCurrency,
      currencyList,
    } = this.props;

    return (
      <div className={classes.actions}>
        <div className={classes.currency}>
          <Currency
            show={showCurrency}
            toggleHandler={currencyToggleHandler}
            selectCurrency={switchCurrency}
            currencyList={currencyList}
            selectedCurrency={selectedCurrency}
          />
        </div>
        <div className={classes.cart}>
          <Cart
            show={showCart}
            toggleHandler={cartToggleHandler}
            cartProducts={cartProducts}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currencyList: state.currency.currencyList,
  selectedCurrency: state.currency.selectedCurrency,
  cartProducts: state.cart.products,
});

export default connect(mapStateToProps, { fetchCurrency, switchCurrency })(
  Actions
);
