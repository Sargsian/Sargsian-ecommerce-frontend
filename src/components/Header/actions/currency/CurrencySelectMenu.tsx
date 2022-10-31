import { Component } from 'react';
import { Currency } from '../../../../models/types';
import Backdrop from '../../../Backdrop';

import classes from './CurrencySelectMenu.module.scss';

type MyProps = {
  show: boolean;
  currencyList: Currency[];
  toggleHandler: () => void;
  selectCurrency: (label: string) => void;
};

class CurrencySelectMenu extends Component<MyProps> {
  render() {
    const { show, currencyList, selectCurrency, toggleHandler } = this.props;

    const onSelectHandler = (label: string) => {
      selectCurrency(label);
      toggleHandler();
    };

    return (
      <>
        <Backdrop show={show} showHandler={toggleHandler}>
          <ul
            className={`${classes.currencyList} ${
              show ? classes.showCurrency : ''
            }`}
          >
            {currencyList.map(({ label }) => {
              return (
                <li key={label} onClick={(e) => onSelectHandler(label)}>
                  <img
                    height={16}
                    // case insensitive logo names, no need to lowercase
                    src={`/${label}.svg`}
                    alt={label}
                  />
                  {label}
                </li>
              );
            })}
          </ul>
        </Backdrop>
      </>
    );
  }
}

export default CurrencySelectMenu;
