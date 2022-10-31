import { Component } from 'react';
import { Link } from 'react-router-dom';
import Actions from './actions/Actions';
import BurgerButton from './BurgerButton';
import Navigation from './Navigation';
import { fetchCategory } from '../../store/reducers/categoryActions';
import { toggleModal } from '../../store/reducers/modalSlice';
import { RootState } from '../../store/store';
import { connect } from 'react-redux';

import classes from './Header.module.scss';

type MyState = {
  burgerActive: boolean;
  showCurrency: boolean;
  showCart: boolean;
  goHome: boolean;
};

type MyProps = {
  modalShow: boolean;
  toggleModal: () => void;
  fetchCategory: (name: string) => void;
};

class Header extends Component<MyProps> {
  state: MyState = {
    burgerActive: false,
    showCurrency: false,
    showCart: false,
    goHome: false,
  };

  burgerToggleHandler = (isActive: boolean) => {
    this.setState({ burgerActive: isActive });
  };

  actionsToggleHandler = () => {
    this.setState({ showCurrency: false });
    this.setState({ showCart: false });
  };

  currencyToggleHandler = () => {
    this.setState({ showCurrency: !this.state.showCurrency });
    if (this.state.burgerActive) {
      this.burgerToggleHandler(false);
    }
    if (this.state.showCart) {
      this.setState({ showCart: false });
    }
  };

  goHomeToggleHandler = () => {
    this.setState({ goHome: true });
    this.props.fetchCategory('');
    if (this.state.burgerActive) {
      this.burgerToggleHandler(false);
    }
    if (this.state.showCart) {
      this.setState({ showCart: false });
    }
    if (this.state.showCurrency) {
      this.setState({ showCurrency: false });
    }
  };

  cartToggleHandler = () => {
    this.setState({ showCart: !this.state.showCart });
    if (this.state.burgerActive) {
      this.burgerToggleHandler(false);
    }
    if (this.state.showCurrency) {
      this.setState({ showCurrency: false });
    }
  };

  render() {
    return (
      <header className={classes.header}>
        <div className={classes.wrapper}>
          <BurgerButton
            burgerActive={this.state.burgerActive}
            navSlide={this.burgerToggleHandler}
            actionsToggleHandler={this.actionsToggleHandler}
          />
          <Navigation
            mobileActive={this.state.burgerActive}
            toggleHandler={this.burgerToggleHandler}
          />
          <Link to='/'>
            <img
              width={41}
              height={41}
              src='/logo.svg'
              alt='logo'
              className={classes.logo}
              onClick={this.goHomeToggleHandler}
            />
          </Link>
          <Actions
            showCurrency={this.state.showCurrency}
            showCart={this.state.showCart}
            cartToggleHandler={this.cartToggleHandler}
            currencyToggleHandler={this.currencyToggleHandler}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  modalShow: state.modal.show,
});

export default connect(mapStateToProps, { toggleModal, fetchCategory })(Header);
