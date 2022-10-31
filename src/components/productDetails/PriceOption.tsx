import { Component } from 'react';
import { connect } from 'react-redux';
import { Product } from '../../models/types';
import { RootState } from '../../store/store';
import classes from './PriceOption.module.scss';

type MyProps = {
  product: Product;
  selectedCurrency: string;
};

class ProductPrice extends Component<MyProps> {
  render() {
    const { prices } = this.props.product;
    const selectedPrice = prices.find(
      (price) => price.currency.label === this.props.selectedCurrency
    );

    return (
      <div className={classes.price}>
        <span>Price:</span>
        <span>
          {selectedPrice?.currency.symbol}
          {selectedPrice?.amount.toFixed(2)}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps)(ProductPrice);
