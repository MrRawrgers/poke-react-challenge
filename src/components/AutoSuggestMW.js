import React from "react";
import Autosuggest from 'react-autosuggest';
import "./AutoSuggestMW.css";

let pokemons = [];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
const escapedValue = escapeRegexCharacters(value.trim());

if (escapedValue === '') {
    return [];
}

const regex = new RegExp('^' + escapedValue, 'i');

return pokemons.filter(pokemon => regex.test(pokemon.name));
}

function getSuggestionValue(suggestion) {
return suggestion.name;
}

function renderSuggestion(suggestion) {
return (
    <span>{suggestion.name}</span>
);
}

class AutoSuggestMW extends React.Component {
    state = {
        value: '',
        suggestions: []
    };

    onChange = (event, { newValue, method }) => {

        pokemons = this.props.data;
        console.log(this.props.data);

        this.setState({
        value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
        suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
        placeholder: "Type 'c'",
        value,
        onChange: this.onChange,
        };

        return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
        );
    }
}

export default AutoSuggestMW;