import { Component } from 'react';
import { Currency } from '../../../../models/types';

type MyProps = {
  selectedCurrency: string;
  show: boolean;
  currencyList: Currency[];
  toggleHandler: () => void;
};

class ToggleButton extends Component<MyProps> {
  render() {
    const { selectedCurrency, show, currencyList, toggleHandler } = this.props;

    const currencySymbol = currencyList.find(
      (price) => price.label === selectedCurrency
    );

    return (
      <button onClick={toggleHandler}>
        <img
          width={21}
          height={16}
          src={`/${currencySymbol ? selectedCurrency : 'USD'}.svg`}
          alt={selectedCurrency}
        />
        <img
          src={`${show ? '/up' : '/down'}-arrow.svg`}
          alt='indication arrow'
          style={{ margin: '0 .5rem' }}
          width={8}
          height={4}
        />
      </button>
    );
  }
}

export default ToggleButton;
