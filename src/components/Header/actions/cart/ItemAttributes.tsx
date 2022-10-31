import { Component } from 'react';
import { CartProduct, Currency } from '../../../../models/types';
import TextAttribute from './attributes/TextAttribute';
import ColorAttribute from './attributes/ColorAttribute';

import classes from './ItemAttributes.module.scss';

type myProps = {
  cartProduct: CartProduct;
  currency: string;
  currencySymbol?: Currency;
  cartPage?: boolean;
};

class ItemAttributes extends Component<myProps> {
  render() {
    const {
      capacity,
      color,
      size,
      touchidinkeyboard,
      withusb3ports,
      product,
      swatchAttribute,
      textAttribute,
    } = this.props.cartProduct;

    const selectedPrice = product.prices.find((price) => {
      if (!this.props.currencySymbol) {
        return price.currency.label === 'USD';
      } else {
        return price.currency.label === this.props.currency;
      }
    });

    return (
      <div
        className={
          this.props.cartPage
            ? `${classes.attributes} ${classes.pageAttributes}`
            : classes.attributes
        }
      >
        <div className={classes.title}>
          <h2>{product.brand}</h2>
          <br />
          <h2>{product.name}</h2>
          <br />
          <span>
            {this.props.currencySymbol?.symbol || '$'}
            {selectedPrice?.amount}
          </span>
        </div>

        {textAttribute &&
          textAttribute.length > 0 &&
          textAttribute.map((attribute) => {
            return (
              <TextAttribute
                key={attribute.id}
                attribute={attribute}
                touchidinkeyboard={touchidinkeyboard}
                withusb3ports={withusb3ports}
                capacity={capacity}
                size={size}
                cartPage={this.props.cartPage}
              />
            );
          })}
        {swatchAttribute && (
          <ColorAttribute
            attributes={swatchAttribute}
            color={color}
            cartPage={this.props.cartPage}
          />
        )}
      </div>
    );
  }
}

export default ItemAttributes;
