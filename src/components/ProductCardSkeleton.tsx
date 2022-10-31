import { Component } from 'react';
import classes from './ProductCardSkeleton.module.scss';

class ProductCardSkeleton extends Component {
  render() {
    return (
      <div className={classes.skeleton}>
        <div className={`${classes.body} ${classes.skeletonAnimation}`}></div>
        <div className={`${classes.info} ${classes.skeletonAnimation}`}></div>
      </div>
    );
  }
}

export default ProductCardSkeleton;

export class TitleSkeleton extends Component {
  render() {
    return (
      <div className={`${classes.title} ${classes.skeletonAnimation}`}></div>
    );
  }
}
