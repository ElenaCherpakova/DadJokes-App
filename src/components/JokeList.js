import React, { Component } from 'react';
import axios from 'axios';
// import Joke from './Joke';

const API_URL = 'https://icanhazdadjoke.com/';
class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get(API_URL, {
        headers: { Accept: 'application/json' },
      });
      jokes.push(response.data.joke);
    }
    this.setState({ jokes: jokes });
  }

  render() {
    return (
      <div className='JokeList'>
        <h1>Dad Joke</h1>
        <div className='JokeList-jokes'>
          {this.state.jokes.map((j) => (
            <div>{j}</div>
          ))}
          ;
        </div>
      </div>
    );
  }
}

export default JokeList;
