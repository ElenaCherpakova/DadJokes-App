import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  render() {
    return (
      <div>
        <p>{this.props.value}</p>
      </div>
    );
  }
}
export default Joke;
