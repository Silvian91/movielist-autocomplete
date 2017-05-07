import React from 'react';

// Fetching data
const NEVYS_MOVIES = 'https://gist.githubusercontent.com/nevyangelova/4d33b83f870520335a8bb7a361db01fd/raw/7c329b9e2bd05adc0559728e7154aaf5e97d7f82/movies.json';
let movies = [];

fetch(NEVYS_MOVIES)
  .then(blob => blob.json())
  .then(data => movies.push(...data));

function findMatches(wordToMatch, movies) {
  if(wordToMatch === '') {
    return [];
  }
  const regex = new RegExp(`^${wordToMatch}`, 'gi');
  return movies.filter(movie => movie.title.match(regex));
}

// Main component
class MovieAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [], currentIndex: 0 };
  }

  showMatches(e) {
    const matchArray = findMatches(e.target.value, movies);
    this.setState({ list: matchArray });
  }

  highlightCurrentMovie(e) {
    // needs fixing
    if(e.keyCode === 40 && 0 < this.state.currentIndex < this.state.list.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }

    if(e.keyCode === 38 && 0 < this.state.currentIndex < this.state.list.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }

    if(e.keyCode === 13) {
      window.open(this.state.list[this.state.currentIndex].link);
    }
  }

  render() {
    return (
      <div id='movies'>
        <form className='search-form'>
          <input type='text' className='search'
            onKeyUp={this.showMatches.bind(this)}
            onChange={this.showMatches.bind(this)}
            onKeyDown={this.highlightCurrentMovie.bind(this)}
            placeholder='Start typing a name..'
           />
           <List {...this.state} />
        </form>
      </div>
    );
  }
};

class List extends React.Component {
  render() {
    return (
      <ul className='suggestions'>
        {
          this.props.list.map((movie, index) =>
            <li className={index === this.props.currentIndex ? 'highlighted' : ''} key={index}>
              <span className='name'>{movie.title}</span>
              <a href={movie.link} target='_blank'>{movie.link}</a>
            </li>
          )
        }
      </ul>
    )
  }
};

module.exports = MovieAutocomplete;
