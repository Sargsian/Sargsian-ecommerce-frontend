import { Component } from 'react';
import classes from './BurgerButton.module.scss';

type MyProps = {
  burgerActive: boolean;
  navSlide: (isActive: boolean) => void;
  actionsToggleHandler: () => void;
};

class BurgerButton extends Component<MyProps> {
  toggleHandler = () => {
    this.props.actionsToggleHandler();
    this.props.navSlide(!this.props.burgerActive);
  };

  render() {
    const { burgerActive } = this.props;

    return (
      <div className={classes.burger}>
        <div
          onClick={this.toggleHandler}
          className={`${classes.lines} ${burgerActive && classes.toggle}`}
        >
          <div className={classes.line1}></div>
          <div className={classes.line2}></div>
          <div className={classes.line3}></div>
        </div>
      </div>
    );
  }
}

export default BurgerButton;
