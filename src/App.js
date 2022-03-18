import './App.css';
import React, { useState } from "react";
import PokemonAPI, { getPokemonByNameAPI, getPokemonListAPI } from './PokemonAPI'

//from https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function RenderTableHeader(props){
  if(props.headerArray){
    if(props.headerArray.length>0){
      const renderHeader = props.headerArray.map((element) => <th key={element}>{element}</th>);
      return renderHeader;
    }
  }
  return null;
}

function RenderTable(props){
  let headerArray = []
  if(props.headerArray){
    headerArray = props.headerArray;
  }
  return (
    <table>
    <thead>
      <tr>
        <RenderTableHeader headerArray={headerArray}></RenderTableHeader>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td>Pikachu</td>
          <td>12</td>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
          <td>17</td>
        </tr>
      </tbody>
    </table>
  );
}

function RenderSpawnedPokemon(props){
  if(props.hasSpawned && props.pokemonPicUrl && props.pokemonName){
    return(
      <div>
      <h1> {props.pokemonName} </h1>
      <img src={props.pokemonPicUrl} />
      </div>
    );
  }
  return null;
}

const App = () => {
  const [numberOfPokemon, setNumberOfPokemon] = useState(899);
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [pokemonPicUrl, setPokemonPicUrl] = useState("");
  const [pokemonStats, setPokemonStats] = useState([{pokemon: '', hp: null, attack: null, defense: null, "special-attack": null , "special-defense": null, speed: null}]);
  const [hasSpawned, setHasSpawned] = useState(false);
  const [catchedPokemons, setCatchedPokemons] = useState(new Set());
  
  const getPokemon = async () => {
    let randomID = getRandomInt(1, numberOfPokemon);
    console.log(randomID);
    getPokemonByNameAPI(randomID).then(function(results){
      console.log(results);
      setPokemonName(results.name);
      setPokemonStats(results.stats);
      setPokemonPicUrl(results.sprites["front_default"]);
    });
    setHasSpawned(true);
  }

  const catchPokemon = () => {
      let catchedPokemon = catchedPokemons; 
      catchedPokemon.add(pokemonName);
      setCatchedPokemons(catchedPokemon);
      console.log(catchedPokemons)        
  }

  return (
    <header className="App-header">
      <div>
        <button onClick={getPokemon}>
        Spawn Pokemon
        </button>

        <button onClick={catchPokemon} >
          Catch Pokemon
        </button>

        <RenderSpawnedPokemon hasSpawned={hasSpawned} pokemonName={pokemonName} pokemonPicUrl ={pokemonPicUrl} >  </RenderSpawnedPokemon>
      </div>
      <div>
      <RenderTable headerArray={["Pokemon", "HP", "Attack", "Defense", "Special-attack", "Special-defense", "Speed"]}></RenderTable>
      </div>
      </header>
  );
}

export default App;