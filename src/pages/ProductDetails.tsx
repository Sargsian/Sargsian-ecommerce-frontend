import { Component } from 'react';
import { connect } from 'react-redux';
import { matchID, Product } from '../models/types';
import { fetchProduct } from '../store/reducers/productActions';
import { RootState } from '../store/store';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import classes from './ProductDetails.module.scss';
import ProductAttributes from '../components/productDetails/ProductAttributes';
import ErrorMessage from '../components/ErrorMessage';

type MyProps = {
  product: Product;
  error: boolean;
  isLoading: boolean;
  fetchProduct: (id: string) => {};
  match: matchID;
};

type MyState = {
  imageSrc: string;
};

type RouterType = RouteComponentProps & MyProps & MyState;

class ProductDetails extends Component<RouterType> {
  state = {
    imageSrc: this.props.product.gallery[0],
  };

  componentDidMount = () => {
    this.props.fetchProduct(this.props.match.params.id);
    this.setState({ imageSrc: '' });
  };

  slideChangeHanlder = (src: string) => {
    this.setState({ imageSrc: src });
  };

  render() {
    const {
      product: { gallery },
      product,
      error,
      isLoading,
      match,
    } = this.props;

    return (
      <div className={classes.container}>
        {!isLoading && product && !error && product.id === match.params.id && (
          <>
            {gallery?.length > 1 && (
              <div className={classes.slides}>
                {gallery.map((src) => {
                  return (
                    <div
                      key={src}
                      className={`${classes.slide} ${classes.stdRatio}`}
                      onClick={() => this.slideChangeHanlder(src)}
                    >
                      <img src={src} alt={src} />
                    </div>
                  );
                })}
              </div>
            )}
            <div className={`${classes.imagePreview} ${classes.stdRatio}`}>
              {gallery && (
                <img src={this.state.imageSrc || gallery[0]} alt='product' />
              )}
            </div>
            <div className={classes.details}>
              <ProductAttributes product={product} />
            </div>
          </>
        )}

        {isLoading && !error && (
          <>
            <div className={classes.slides}>
              {[...Array(6)].map((e, i) => {
                return (
                  <div
                    key={i}
                    className={`${classes.slide} ${classes.stdRatio} ${classes.skeletonAnimation}`}
                  ></div>
                );
              })}
            </div>
            <div
              className={`${classes.imagePreview} ${classes.skeletonAnimation}`}
            ></div>
            <div
              className={`${classes.details} ${classes.skeletonAnimation}`}
            ></div>
          </>
        )}

        {!isLoading && error && (
          <ErrorMessage message={'Failed loading product'} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  product: state.product.product,
  isLoading: state.product.isLoading,
  error: state.product.error,
});

export default connect(mapStateToProps, { fetchProduct })(
  withRouter(ProductDetails)
);
