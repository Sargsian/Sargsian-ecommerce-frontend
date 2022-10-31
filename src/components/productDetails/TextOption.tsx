import { ChangeEvent, Component } from 'react';
import { AttributeSet } from '../../models/types';
import classes from './TextOption.module.scss';

type MyProps = {
  attributes: AttributeSet;
  attributeChangeHandler: (name: Record<string, string>) => void;
};

class ProductSize extends Component<MyProps> {
  componentDidMount = () => {
    const name = this.props.attributes.name.toLowerCase().replace(/ /g, '');
    const initialValue = this.props.attributes.items[0].value;
    this.props.attributeChangeHandler({ [name]: initialValue });
  };

  valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = this.props.attributes.name.toLowerCase().replace(/ /g, '');

    this.props.attributeChangeHandler({
      [name]: e.currentTarget.value,
    });
  };

  render() {
    const { attributes } = this.props;
    return (
      <div className={classes.options}>
        <span>{attributes.name}:</span>
        <div>
          {attributes.items.map((item, i) => {
            return (
              <label key={item.id}>
                <input
                  type='radio'
                  defaultChecked={i === 0}
                  name={attributes.name}
                  value={item.value}
                  onChange={this.valueChangeHandler}
                />
                <span className={classes.icon}>{item.value}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductSize;
