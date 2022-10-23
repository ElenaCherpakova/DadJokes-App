import React, { Component } from 'react';

class Joke extends Component {
  render() {
    const { votes, text, upVote, downVote } = this.props;
    return (
      <div className='Joke'>
        <div className='Joke-button'>
          <i className='fas fa-arrow-up' onClick={upVote} />
          <span>{votes}</span>
          <i className='fas fa-arrow-down' onClick={downVote} />
        </div>
        <span>{text}</span>
      </div>
    );
  }
}
export default Joke;
