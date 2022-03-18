import './App.css';
import React, { useState } from "react";
import PokemonAPI, { getPokemonByNameAPI, getPokemonListAPI } from './PokemonAPI'

//from https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
  console.log(props);
  if(props.hasSpawned){
    return(
      <h1> {props.pokemonName} </h1>
    );
  }
  return null;
}

const App = () => {
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [pokemonStats, setPokemonStats] = useState([{pokemon: '', hp: null, attack: null, defense: null, "special-attack": null , "special-defense": null, speed: null}])
  const [hasSpawned, setHasSpawned] = useState(false);
  
  const getPokemon = async () => {
    getPokemonListAPI().then(function(results){
      let randomID = getRandomInt(results.length);
      setPokemonName(results[randomID].name);
    });

    getPokemonByNameAPI(pokemonName).then(function(results){
      setPokemonStats(results.stats)
    });
    setHasSpawned(true);
  }

  return (
    <header className="App-header">
      <div>
        <button onClick={getPokemon}>
        Spawn Pokemon
        </button>

        <RenderSpawnedPokemon hasSpawned={hasSpawned} pokemonName={pokemonName}> </RenderSpawnedPokemon>
      </div>
      <div>
      <RenderTable headerArray={["Pokemon", "HP", "Attack", "Defense", "Special-attack", "Special-defense", "Speed"]}></RenderTable>
      </div>
      </header>
  );
}

export default App;