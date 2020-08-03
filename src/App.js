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
  };

  //this is a React lifecycle method (part of react)
  //you may want to look it up, and also might want to remind yourself about async/await
  async componentDidMount() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    // console.log(data.results) <--- uncomment this to see what data you get from this fetch request
    console.log(data.results)

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
    let pokeArray = this.state.pokemonSelected;
    pokeArray.push(info);
    this.setState({ pokemonSelected: pokeArray });
  };
  render() {
    const { allPokemon, userValue, pokemonSelected } = this.state;
    return (
      <div>
        <AutoSuggest
          data={allPokemon}
          userValue={userValue}
          handleChange={this.handleChange}
          handleInputClick={this.handleInputClick}
          handleButtonClick={this.handleButtonClick}
        />
        <div className="card-container">
          {pokemonSelected.map((pokemon) => {
            return (
              <div>
                <InfoCard pokemonData={pokemon} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
