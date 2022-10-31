import { Component } from 'react';
import classes from './CartImageSlider.module.scss';

type MyProps = {
  gallery: string[];
};

type MyState = {
  imageSrc: string;
  position: number;
  end: number;
};

class CartImageSlider extends Component<MyProps, MyState> {
  state: MyState = {
    imageSrc: this.props.gallery[0],
    position: 0,
    end: this.props.gallery.length - 1,
  };

  nextImageHandler = (gallery: string[]) => {
    const { position, end } = this.state;
    if (position < end) {
      this.setState({
        imageSrc: gallery[position + 1],
        position: position + 1,
      });
    }
  };

  prevImageHandler = (gallery: string[]) => {
    const { position } = this.state;
    if (position > 0) {
      this.setState({
        imageSrc: gallery[position - 1],
        position: position - 1,
      });
    }
  };

  render() {
    const { gallery } = this.props;

    return (
      <div className={classes.itemImg}>
        <img src={this.state.imageSrc} alt='' />
        {gallery.length > 1 && (
          <div className={classes.slideButtons} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => this.prevImageHandler(gallery)}
              disabled={gallery.length === 0 || this.state.position === 0}
            >
              <img src={'/prev.svg'} alt='prev' />
            </button>
            <button
              onClick={() => this.nextImageHandler(gallery)}
              disabled={
                gallery.length === 0 ||
                this.state.position === gallery.length - 1
              }
            >
              <img src={'/next.svg'} alt='next' />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CartImageSlider;
