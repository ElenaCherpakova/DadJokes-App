import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import laughIcon from '../assets/laugh.png';
import uuid from 'react-uuid';

import './JokeList.css';
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
      jokes.push({ id: uuid(), text: response.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
  }

  handleVote(id, delta) {
    this.setState((prevState) => ({
      jokes: prevState.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j,
      ),
    }));
  }

  render() {
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> Joke
          </h1>
          <div className='JokeList-circle'>
            <img src={laughIcon} alt='laughIcon' />
            <button className='JokeList-getmore'>New Jokes</button>
          </div>
        </div>

        <div className='JokeList-jokes'>
          {this.state.jokes.map((j) => (
            <Joke
              key={j.id}
              text={j.text}
              votes={j.votes}
              upVote={() => this.handleVote(j.id, 1)}
              downVote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
