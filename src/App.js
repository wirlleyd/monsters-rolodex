import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box';

class App extends Component {
  constructor() {
    super()
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  async componentDidMount() {
    const users =
      await (await fetch("http://jsonplaceholder.typicode.com/users")).json()
    this.setState({ monsters: [...users, ...this.state.monsters] })
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value })
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App" >
        <h1>Monsters Rolodex</h1>
        <SearchBox handleChange={e => this.handleChange(e)}
          placeholder="searchMonsters" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
