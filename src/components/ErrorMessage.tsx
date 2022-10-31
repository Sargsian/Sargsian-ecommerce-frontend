import { Component } from 'react';

type MyProps = {
  message: string;
};

class ErrorMessage extends Component<MyProps> {
  render() {
    const { message } = this.props;
    return (
      <p
        style={{
          color: 'red',
          fontSize: '2rem',
          margin: '0 auto',
          opacity: '.8',
        }}
      >
        {message}
      </p>
    );
  }
}

export default ErrorMessage;
