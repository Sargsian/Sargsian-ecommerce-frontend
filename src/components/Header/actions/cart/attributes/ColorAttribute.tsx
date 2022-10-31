import { Component } from 'react';
import { AttributeSet } from '../../../../../models/types';

import classes from './ColorAttribute.module.scss';

type MyProps = {
  attributes: AttributeSet;
  color?: string;
  cartPage?: boolean;
};

class ColorAttribute extends Component<MyProps> {
  render() {
    const { attributes, color } = this.props;

    return (
      <div
        className={
          this.props.cartPage
            ? `${classes.color} ${classes.cartPageColor}`
            : classes.color
        }
      >
        <span>{attributes.name}:</span>
        <div>
          {attributes.items.map((item, i) => {
            return (
              <span
                key={item.id}
                style={{
                  background: item.value,
                  border:
                    item.displayValue === 'White' && color !== 'White'
                      ? '1px solid black'
                      : 'none',
                }}
                className={item.displayValue === color ? classes.selected : ''}
              ></span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ColorAttribute;
