import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Product } from '../models/types';
import { RootState } from '../store/store';
import { fetchCategory } from '../store/reducers/categoryActions';
import {
  match,
  withRouter,
  RouteComponentProps,
  Route,
} from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import classes from './ProductList.module.scss';
import ProductCardSkeleton, {
  TitleSkeleton,
} from '../components/ProductCardSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import ProductModal from '../components/ProductModal';

type MyProps = {
  products: Product[];
  isLoading: boolean;
  error: boolean;
  match: match;
  showModal: boolean;
  fetchCategory: (category: string) => void;
};

type MyState = {
  paginationLimit: number;
  toggleModal: boolean;
};

type RouterType = RouteComponentProps & MyProps & MyState;

class ProductList extends Component<RouterType> {
  componentDidMount = () => {
    this.props.fetchCategory('');
  };

  state: MyState = {
    paginationLimit: 6,
    toggleModal: true,
  };

  toggleModalHandler = () => {
    this.setState({ toggleModal: !this.state.toggleModal });
  };

  render() {
    const { products, isLoading, error, match, showModal } = this.props;
    const { paginationLimit } = this.state;
    const url = match.url;

    const categoryName = url === '/' ? 'all' : url.slice(1);
    const path = url === '/' ? url : `${url}/`;

    const filteredProducts = products.filter(
      (product) => product.category === categoryName || categoryName === 'all'
    );

    return (
      <>
        <div className={classes.container}>
          {!isLoading && !error && <h1>{categoryName}</h1>}
          {isLoading && !error && <TitleSkeleton />}
          <div className={classes.productList}>
            {filteredProducts.length > 0 &&
              !isLoading &&
              filteredProducts.reduce(
                (products: ReactNode[], currProduct, i) => {
                  if (paginationLimit <= i) return products;
                  return [
                    ...products,
                    <ProductCard
                      key={currProduct.id}
                      product={currProduct}
                      categoryName={categoryName}
                    />,
                  ];
                },
                []
              )}

            {isLoading &&
              !error &&
              [...Array(6)].map((e, i) => {
                return <ProductCardSkeleton key={i} />;
              })}
          </div>
          {products.length > 0 && filteredProducts.length > paginationLimit && (
            <button
              onClick={() =>
                this.setState({ paginationLimit: paginationLimit + 2 })
              }
              className={classes.loadMore}
            >
              Load More
            </button>
          )}
          {!isLoading && error && (
            <ErrorMessage message={'Failed loading products'} />
          )}
        </div>
        {showModal && (
          <Route path={`${path}attributes/:id`} component={ProductModal} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.category.products,
  isLoading: state.category.isLoading,
  error: state.category.error,
  showModal: state.modal.show,
});

export default connect(mapStateToProps, { fetchCategory })(
  withRouter(ProductList)
);
