import { Component } from 'react';
import { client } from '@tilework/opus';
import Header from './components/Header/Header';
import ProductList from './pages/ProductList';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from './store/store';
import { Category } from './models/types';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

type MyProps = {
  categories: Category[];
};

class App extends Component<MyProps> {
  render() {
    const { categories } = this.props;

    client.setEndpoint('http://localhost:5000/graphql');

    const categoryPaths = categories.reduce((paths: string[], currentPath) => {
      if (currentPath.name === 'all') return paths;

      return [...paths, `/${currentPath.name}`];
    }, []);

    return (
      <>
        <Header />
        <main className='content'>
          <Switch>
            <Route path={categoryPaths} component={ProductList} />
            <Route path={'/cart'} component={Cart} />
            <Route exact path={'/product/:id'} component={ProductDetails} />
            <Route path={'/'} component={ProductList} />
          </Switch>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
});
export default connect(mapStateToProps)(App);
