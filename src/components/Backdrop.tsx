import React, { Component, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import classes from './Backdrop.module.scss';

const root = document.getElementById('backdrop-root')!;

type MyProps = {
  showHandler: () => void;
  show: boolean;
  opacity?: boolean;
  children: ReactElement;
};

class Backdrop extends Component<MyProps> {
  
  render() {
    return (
      <>
        {this.props.show &&
          createPortal(
            <div
              style={
                this.props.opacity
                  ? { background: 'rgba(57, 55, 72, 0.22)' }
                  : { background: 'rgba(57, 55, 72, 0)' }
              }
              onClick={this.props.showHandler}
              className={classes.backdrop}
            ></div>,
            root
          )}
        {/* Children should be one node only and not a component */}
        {React.cloneElement(this.props.children, {
          className: `${this.props.children.props.className} ${classes.visiblity} `,
        })}
      </>
    );
  }
}

export default Backdrop;

export class Modal extends Component<MyProps> {
  componentDidMount = () => {
    document.body.style.overflowY = 'hidden';
  };

  componentWillUnmount = () => {
    document.body.style.overflowY = 'auto';
  };

  render() {
    return (
      <>
        {this.props.show &&
          createPortal(
            <div
              style={
                this.props.opacity
                  ? { background: 'rgba(57, 55, 72, 0.22)' }
                  : { background: 'rgba(57, 55, 72, 0)' }
              }
              onClick={() => this.props.showHandler()}
              className={classes.backdrop}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  zIndex: '2',
                }}
              >
                {this.props.children}
              </div>
            </div>,
            root
          )}
      </>
    );
  }
}
