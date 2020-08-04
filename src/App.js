import React, { Component } from "react";
import AutoSuggest from "./components/AutoSuggest";
import InfoCard from "./components/InfoCard";
import "./App.css";

class App extends Component {
  state = {
    allPokemon: null,
    userValue: "",
    selectedIndex: null,
    pokemonSelected: [],
    showList: false
  };

  //this is a React lifecycle method (part of react)
  //you may want to look it up, and also might want to remind yourself about async/await
  async componentDidMount() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    // console.log(data.results) <--- uncomment this to see what data you get from this fetch request

    if (data) {
      for (let i = 0; i < data.results.length; i++) {
        let capital = data.results[i].name.charAt(0).toUpperCase();
        let split = data.results[i].name.split("")
        split.splice(0, 1, capital)
        data.results[i].name = split.join('')
      }
      data.results.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
    this.setState({ allPokemon: data.results });
  }

  handleChange = (event) => {
    this.setState({ userValue: event.target.value });
  };

  handleInputClick = async (selectedName, index) => {
    this.setState({ userValue: selectedName, selectedIndex: index });
  };

  handleButtonClick = async (data) => {
    const response = await fetch(data[this.state.selectedIndex].url);
    const info = await response.json();
    // console.log(info) <----- uncomment this to see what data you get from this fetch request
    if (this.state.pokemonSelected.length < 4) {
      let poke = info.name;
      let capital = poke.charAt(0).toUpperCase();
      let split = poke.split("")
      split.splice(0, 1, capital)
      let pokemon = split.join('')
      info.name = pokemon
      let array = this.state.pokemonSelected
      let found = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i].name === pokemon) {
          found = true;
          break;
        }
      }
      if (found === true) {
        return;
      } else {
        array.push(info)
        this.setState({ pokemonSelected: array });
      }
    }
  };

  handleFocus = () => {
    this.setState({
      showList: true,
    })
  }

  handleBlur = (e) => {
    this.setState({
      showList: false,
    })
  }

  handleDelete = (id) => {
    this.setState({
      pokemonSelected: this.state.pokemonSelected.filter(pokemon => pokemon.id
        !== id
      )
    })
  }

  render() {
    const { allPokemon, userValue, pokemonSelected, showList } = this.state;
    return (
      <div className="background">
        <div className="search-wrapper">
          <AutoSuggest
            data={allPokemon}
            userValue={userValue}
            show={showList}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
            handleInputClick={this.handleInputClick}
            handleButtonClick={this.handleButtonClick}
          />
        </div>
        <div className="card-container">
          {pokemonSelected.map((pokemon) => {
            return (
              <div className="pokecard">
                <InfoCard
                  pokemonData={pokemon}
                  key={pokemon.id}
                  onDelete={() => this.handleDelete(pokemon.id)}
                  pokemon={pokemon}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
