import React from "react";
import "../autoSuggest.css";

const AutoSuggest = props => {

  return (
    <div className="searchlistcontainer">
      <input spellCheck="false" onFocus={props.handleFocus} onBlur={props.handleBlur} onChange={props.handleChange} value={props.userValue} />
      <div className="divide"></div>
      <button
        onClick={() => {
          props.handleButtonClick(props.data);
        }}
      >
        Search for Pokemon data
      </button>
      <div className="divide"></div>
      <button
        onClick={() => {
          props.handleReset()
        }}
      >
        Reset!
          </button>
      {props.show ? <div className="drop-down">
        {props.data ? (
          props.data.map((pokemon, index) => {
            return (
              <h3 key={index} onMouseDown={() => props.handleInputClick(pokemon.name, index)}>
                {pokemon.name}
              </h3>
            );
          })
        ) : (
            <h1>Loading...</h1>
          )}
      </div> : null}
    </div>
  );
};

export default AutoSuggest;
