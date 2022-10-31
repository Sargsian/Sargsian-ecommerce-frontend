import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Category } from '../../models/types';
import { fetchCategories } from '../../store/reducers/categoriesActions';
import { fetchCategory } from '../../store/reducers/categoryActions';
import { RootState } from '../../store/store';
import Backdrop from '../Backdrop';
import classes from './Navigation.module.scss';

type MyProps = {
  categories: Category[];
  fetchCategories: () => void;
  fetchCategory: (name: string) => void;
  mobileActive?: boolean;
  toggleHandler: (isActive: boolean) => void;
};

class Navigation extends Component<MyProps> {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, mobileActive, toggleHandler, fetchCategory } =
      this.props;

    const clickHandler = (category: string) => {
      if (mobileActive) {
        toggleHandler(false);
      }
      fetchCategory(category);
    };

    return (
      <Backdrop
        show={mobileActive !== undefined && mobileActive}
        showHandler={() => toggleHandler(false)}
        opacity
      >
        <nav
          className={`${classes.navigation} ${
            mobileActive && classes.mobileActive
          }`}
        >
          {categories &&
            categories.length > 0 &&
            categories.map((category) => {
              return (
                <NavLink
                  exact
                  key={category.name}
                  to={category.name === 'all' ? '/' : `/${category.name}`}
                  title={category.name}
                  activeClassName={classes.activeLink}
                  onClick={() => clickHandler(category.name)}
                >
                  {category.name}
                </NavLink>
              );
            })}
        </nav>
      </Backdrop>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
});

export default connect(mapStateToProps, { fetchCategories, fetchCategory })(
  Navigation
);
