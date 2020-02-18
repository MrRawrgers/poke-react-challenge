import React from "react";
import "../infoCard.css";

const InfoCard = props => {
  console.log(props.pokemonData);
  return (
    <div className="card">
      <img src={props.pokemonData.sprites.front_default} />
      <h3>Name: {props.pokemonData.name}</h3>
      <h3>Height: {props.pokemonData.height}</h3>
      <h3>Abiltities</h3>
      {props.pokemonData.abilities.map((ability, index) => {
        return <p key={index}>{ability.ability.name}</p>;
      })}
      <h3>Stats: </h3>
      {props.pokemonData.stats.map((currentStat, index) => {
        return (
          <p key={index}>
            {currentStat.stat.name}: {currentStat.base_stat}
          </p>
        );
      })}
    </div>
  );
};

export default InfoCard;
