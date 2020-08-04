import React from "react";
import "../autoSuggest.css";

const AutoSuggest = props => {
  return (
    <div className="searchlistcontainer">
      <input onFocus={props.handleFocus} onBlur={props.handleBlur} onChange={props.handleChange} value={props.userValue} />
      <button
        onClick={() => {
          props.handleButtonClick(props.data);
        }}
      >
        Search for Pokemon data
      </button>


      {props.show ? <div className="drop-down">
        {props.data ? (
          props.data.map((pokemon, index) => {
            return (
              <h3 key={index} onClick={() => props.handleInputClick(pokemon.name, index)}>
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
