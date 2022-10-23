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
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.text));
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = [];

      while (jokes.length < this.props.numJokesToGet) {
        let response = await axios.get(API_URL, {
          headers: { Accept: 'application/json' },
        });

        let newJoke = response.data.joke;
        //check if joke is unique and not a repeat
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log('Found a duplicate!');
          console.log(newJoke);
        }
      }
      this.setState(
        (prevState) => ({
          loading: false,
          jokes: [...prevState.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem(
            'jokes',
            JSON.stringify(this.state.jokes),
          ),
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      (prevState) => ({
        jokes: prevState.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + delta } : j,
        ),
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)),
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      );
    }
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> Joke
          </h1>
          <div className='JokeList-circle'>
            <img src={laughIcon} alt='laughIcon' />
            <button className='JokeList-getmore' onClick={this.handleClick}>
              New Jokes
            </button>
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
