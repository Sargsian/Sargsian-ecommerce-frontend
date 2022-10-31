import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Interweave } from 'interweave';
import { AttributeSet, CartProduct, Product } from '../../models/types';
import { addToCart } from '../../store/reducers/cartSlice';
import { RootState } from '../../store/store';
import ColorOption from './ColorOption';
import PriceOption from './PriceOption';
import TextOption from './TextOption';

import classes from './ProductAttributes.module.scss';
import { shallowComparison } from '../../utils';
import { Link } from 'react-router-dom';

type MyProps = {
  product: Product;
  addToCart: (product: CartProduct) => void;
  isModal?: boolean;
  cartProducts: CartProduct[];
};

type ProductState = {
  color?: string;
  size?: string;
  capacity?: string;
  touchidinkeyboard?: string;
  withusb3ports?: string;
};

type MyState = ProductState & { expand: boolean; isOverflown: boolean };

class ProductAttributes extends Component<MyProps, MyState> {
  private descRef = createRef<HTMLDivElement>();

  state: MyState = {
    expand: false,
    isOverflown: false,
  };

  expandTextHandler = () => {
    if (this.state.expand) return;
    this.setState({ expand: true });
  };

  isOverFlown(element: HTMLDivElement) {
    return element.scrollHeight > element.clientHeight;
  }

  componentDidMount = () => {
    this.descRef.current &&
      this.isOverFlown(this.descRef.current) &&
      this.setState({ isOverflown: true });
  };

  render() {
    const { addToCart, isModal, product, cartProducts } = this.props;
    const { brand, description, name, attributes, inStock, id } = product;

    let swatchAttribute: AttributeSet | undefined;
    let textAttribute: AttributeSet[] | undefined;

    if (attributes && attributes.length > 0) {
      swatchAttribute = attributes.find(
        (attribute) => attribute.type === 'swatch'
      );

      textAttribute = attributes.filter(
        (attribute) => attribute.type === 'text'
      );
    }

    const newProduct = {
      productId: id,
      capacity: this.state.capacity,
      color: this.state.color,
      size: this.state.size,
      touchidinkeyboard: this.state.touchidinkeyboard,
      withusb3ports: this.state.withusb3ports,
      product: product,
      swatchAttribute,
      textAttribute,
      quantity: 1,
    };

    const isInCart = cartProducts.find((product) => {
      Object.keys(newProduct).forEach(
        (key) =>
          newProduct[key as keyof typeof newProduct] === undefined &&
          delete newProduct[key as keyof typeof newProduct]
      );
      return shallowComparison([product], {
        ...newProduct,
        instanceId: 0,
        quantity: 0,
      });
    });

    const attributeChangeHandler = (attribute: ProductState) => {
      this.setState(attribute);
    };

    const addToCartHandler = () => {
      if (!inStock) return;

      addToCart({ ...newProduct, instanceId: Date.now() });
    };

    return (
      <div className={classes.attributes}>
        <div className={classes.title}>
          <h3>{brand}</h3>
          <h2>{name}</h2>
        </div>

        {textAttribute?.map((attribute) => {
          return (
            <TextOption
              key={attribute.id}
              attributeChangeHandler={attributeChangeHandler}
              attributes={attribute}
            />
          );
        })}

        {swatchAttribute && (
          <ColorOption
            attributeChangeHandler={attributeChangeHandler}
            attributes={swatchAttribute}
          />
        )}

        <PriceOption product={product} />
        {isInCart ? (
          <Link to={'/cart'}>
            <button
              style={{
                color: '#1d1f22',
                background: 'white',
                border: '1px solid #1d1f22',
              }}
              className={classes.cta}
            >
              Go to Cart
            </button>
          </Link>
        ) : (
          <button
            className={classes.cta}
            disabled={!inStock}
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        )}
        {!inStock && (
          <p
            style={{
              marginTop: '-3rem',
              marginBottom: '2rem',
              fontWeight: '600',
              color: 'red',
              opacity: '.6',
            }}
          >
            This product is currently out of stock
          </p>
        )}
        {!isModal && (
          <div
            ref={this.descRef}
            className={`${classes.desc} ${
              this.state.isOverflown && classes.isOverFlown
            } ${this.state.expand && classes.expand}`}
            onClick={
              this.state.isOverflown ? this.expandTextHandler : undefined
            }
          >
            <Interweave content={description} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.cart.isLoading,
  error: state.cart.error,
  cartProducts: state.cart.products,
});

export default connect(mapStateToProps, { addToCart })(ProductAttributes);