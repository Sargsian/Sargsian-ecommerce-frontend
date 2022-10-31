import { Component } from 'react';
import CurrencySelectMenu from './CurrencySelectMenu';
import { Currency as CurrencyType } from '../../../../models/types';
import ToggleButton from './ToggleButton';

type MyProps = {
  show: boolean;
  currencyList: CurrencyType[];
  toggleHandler: () => void;
  selectCurrency: (label: string) => void;
  selectedCurrency: string;
};

class Currency extends Component<MyProps> {
  render() {
    const {
      currencyList,
      selectCurrency,
      selectedCurrency,
      show,
      toggleHandler,
    } = this.props;
    return (
      <>
        <ToggleButton
          show={show}
          selectedCurrency={selectedCurrency}
          toggleHandler={toggleHandler}
          currencyList={currencyList}
        />
        <CurrencySelectMenu
          selectCurrency={selectCurrency}
          show={show}
          toggleHandler={toggleHandler}
          currencyList={currencyList}
        />
      </>
    );
  }
}

export default Currency;
