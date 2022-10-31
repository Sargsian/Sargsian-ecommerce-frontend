import { ChangeEvent, Component } from 'react';
import { AttributeSet } from '../../models/types';
import classes from './ColorOption.module.scss';

type MyProps = {
  attributes: AttributeSet;
  attributeChangeHandler: (name: { color: string }) => void;
};

class ProductColor extends Component<MyProps> {
  componentDidMount = () => {
    const colorAttribute = this.props.attributes.items;

    this.props.attributeChangeHandler({
      color: colorAttribute[0].displayValue,
    });
  };

  colorChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.attributeChangeHandler({ color: e.currentTarget.value });
  };

  render() {
    const { attributes } = this.props;

    return (
      <div className={classes.color}>
        <span>{attributes.name && attributes.name}:</span>
        <div>
          {attributes.items.map((item, i) => {
            return (
              <label key={item.id}>
                <input
                  type='radio'
                  name={'color'}
                  defaultChecked={i === 0}
                  value={item.displayValue}
                  onChange={this.colorChangeHandler}
                />
                <span
                  style={{
                    background: `${item.value}`,
                    border:
                      item.displayValue === 'White'
                        ? '1px solid black'
                        : 'none',
                  }}
                ></span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductColor;
