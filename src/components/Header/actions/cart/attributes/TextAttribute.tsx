import { Component } from 'react';
import { AttributeSet } from '../../../../../models/types';

import classes from './TextAttribute.module.scss';

type MyProps = {
  attribute: AttributeSet;
  withusb3ports?: string;
  touchidinkeyboard?: string;
  capacity?: string;
  size?: string;
  cartPage?: boolean;
};

class CheckmarkAttribute extends Component<MyProps> {
  render() {
    const {
      attribute,
      withusb3ports,
      touchidinkeyboard,
      capacity,
      size,
      cartPage,
    } = this.props;

    const checkValue = (
      touch: string | undefined,
      usb: string | undefined,
      capacity: string | undefined,
      size: string | undefined,
      value: string,
      itemName: string
    ) => {
      switch (itemName) {
        case 'Touch ID in keyboard':
          return touch === value ? true : false;
        case 'With USB 3 ports':
          return usb === value ? true : false;
        case 'Capacity':
          return capacity === value ? true : false;
        case 'Size':
          return size === value ? true : false;
        default:
          return false;
      }
    };

    return (
      <div
        className={
          this.props.cartPage
            ? `${classes.cartOptions} ${classes.pageCartOptions}`
            : classes.cartOptions
        }
      >
        <span>{attribute.name}:</span>
        <div>
          {attribute.items.map((item, i) => {
            return (
              <span
                key={item.id}
                style={
                  attribute.name === 'Size' && !cartPage
                    ? { width: '24px', height: '24px' }
                    : {}
                }
                className={
                  checkValue(
                    touchidinkeyboard,
                    withusb3ports,
                    capacity,
                    size,
                    item.value,
                    attribute.name
                  )
                    ? classes.checked
                    : ''
                }
              >
                {item.value}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CheckmarkAttribute;
