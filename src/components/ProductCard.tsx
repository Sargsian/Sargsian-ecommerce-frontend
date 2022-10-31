import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Product } from '../models/types';
import { RootState } from '../store/store';
import { toggleModal } from '../store/reducers/modalSlice';

import classes from './ProductCard.module.scss';

type MyProps = {
  product: Product;
  selectedCurrency: string;
  categoryName: string;
  toggleModal: () => void;
};

class ProductCard extends Component<MyProps> {
  state = {
    toggleModal: true,
  };

  render() {
    const { name, inStock, gallery, prices, brand, id } = this.props.product;

    const cardClass = `${classes.card} ${!inStock ? classes.outOfStock : ''}`;
    const selectedPrice = prices.find(
      (price) => price.currency.label === this.props.selectedCurrency
    );

    const categoryName =
      this.props.categoryName === 'all' ? '/' : `/${this.props.categoryName}/`;

    return (
      <>
        <div className={cardClass}>
          <div className={classes.imgContainer}>
            {!inStock && <span>Out of stock</span>}
            <Link to={`/product/${id}`}>
              {gallery && <img src={gallery[0]} alt='' />}
            </Link>
            {inStock && (
              <Link to={`${categoryName}attributes/${id}`}>
                <button
                  onClick={() => this.props.toggleModal()}
                  className={classes.inCart}
                ></button>
              </Link>
            )}
          </div>

          <div className={classes.details}>
            <Link to={`/product/${id}`}>
              <span>
                {brand} {name}
              </span>
            </Link>
            <span>{`${selectedPrice?.currency.symbol} ${selectedPrice?.amount.toFixed(2)}`}</span>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedCurrency: state.currency.selectedCurrency,
});

export default connect(mapStateToProps, { toggleModal })(ProductCard);
