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
    showList: false,
    showWarning: false
  };

  //this is a React lifecycle method (part of react)
  //you may want to look it up, and also might want to remind yourself about async/await
  async componentDidMount() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    // console.log(data.results) <--- uncomment this to see what data you get from this fetch request

    if (data) {
      for (let i = 0; i < data.results.length; i++) {
        data.results[i].name = this.handleCapitalize(data.results[i].name)
      }
      data.results.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
    this.setState({ allPokemon: data.results });
  }

  handleChange = (event) => {
    this.setState({
      userValue: this.handleCapitalize(event.target.value),
      selectedIndex: this.state.allPokemon.findIndex((el) => el.name === event.target.value)
    });
  };

  handleInputClick = async (selectedName, index) => {
    this.setState({ userValue: selectedName, selectedIndex: index });
  };

  handleCapitalize = (p) => {
    let split = p.split("")
    let capital = p.charAt(0).toUpperCase();
    let end = split.slice(1).join('').toLowerCase()
    p = capital + end
    return p
  }

  handleButtonClick = async (data) => {
    if (this.state.selectedIndex < 0 || this.state.selectedIndex === null) {
      this.setState({
        showWarning: true,
      })
    }
    else {
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

          this.setState({ userValue: "" })
          const response = await fetch(data[this.state.selectedIndex].url);
          const info = await response.json();
          // console.log(info) <----- uncomment this to see what data you get from this fetch request
          if (this.state.pokemonSelected.length < 4) {
            info.name = this.handleCapitalize(info.name)
            let array = this.state.pokemonSelected
            let found = false;
            for (var i = 0; i < array.length; i++) {
              if (array[i].name === info.name) {
                found = true;
                break;

              }
            }
          }
        }
      }
    }
  };

  handleFocusOne = () => {
    this.setState({
      showList: true,
      showWarning: false
    })
  }

  handleWarning = () => {
    this.setState({
      showWarning: false,
      userValue: "",
      showList: true
    })
  }

  handleFocus = () => {
    const list = this.state.allPokemon
    const input = this.state.userValue
    for (let i = 0; i < list.length; i++) {
      if (input === "" || input === list[i].name) {
        this.handleFocusOne()
      }
      else if (input !== list[i].name) {
        this.handleWarning()
      }
    }
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

  handleReset = () => {
    window.location.reload(false);
  }

  render() {
    const { allPokemon, userValue, pokemonSelected, showList, showWarning } = this.state;
    return (
      <div className="background">
        <div className="search-wrapper">
          <AutoSuggest
            data={allPokemon}
            userValue={userValue}
            show={showList}
            warning={showWarning}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
            handleInputClick={this.handleInputClick}
            handleButtonClick={this.handleButtonClick}
            handleReset={() => this.handleReset()}
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
