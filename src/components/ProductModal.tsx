import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { Modal } from './Backdrop';
import { toggleModal } from '../store/reducers/modalSlice';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Currency, matchID, Product } from '../models/types';

import ProductAttributes from './productDetails/ProductAttributes';
import CartImageSlider from './CartImageSlider';

import classes from './ProductModal.module.scss';

type MyProps = {
  toggleModal: () => void;
  showModal: boolean;
  products: Product[];
  currency: string;
  currencyList: Currency[];
  match: matchID;
};

type RouterType = RouteComponentProps & MyProps;

class ProductModal extends Component<RouterType> {
  componentWillUnmount(): void {
    if (this.props.showModal) {
      this.props.toggleModal();
    }
  }

  render() {
    const { toggleModal, showModal, history, match, products } = this.props;

    const toggleModalHandler = () => {
      toggleModal();
      history.goBack();
    };

    const id = match.params.id;
    const product = products.find((product) => product.id === id);

    return (
      <Modal opacity showHandler={toggleModalHandler} show={showModal}>
        <div className={classes.productModal}>
          <button onClick={toggleModalHandler}>
            <img src={'/closeButton.svg'} width='40' height='40' alt='close' />
          </button>

          {product && (
            <div>
              <ProductAttributes product={product} isModal />
            </div>
          )}
          <div className={classes.actions}>
            {product && <CartImageSlider gallery={product?.gallery} />}
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  showModal: state.modal.show,
  products: state.category.products,
  currency: state.currency.selectedCurrency,
  currencyList: state.currency.currencyList,
});

export default connect(mapStateToProps, {
  toggleModal,
})(withRouter(ProductModal));