import './App.css';
import React, {useEffect, useState } from "react";
import {ToastsContainer, ToastsStore} from 'react-toasts';

/** from https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random
returns int x where: min<= x < max  * */ 
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/** This app was heavily inspired by:
 * https://github.com/Siphiwo/react-pokemon-codex/blob/master/src/App.js
 */
const App = () => {
  const[allCatchedPokemons, setAllCatchedPokemons] = useState([]);
  const[currentPokemon, setCurrentPokemon] = useState(null);
  const[pokeballsLeft, setPokeballsleft] = useState(50);
  const[superballsLeft, setSuperballsleft] = useState(20);
  const[hyperballsLeft, setHyperballsleft] = useState(10);
  const[masterballsLeft, setMasterballsleft] = useState(3);
  var pokeballValue = 0;
  var superballValue = 10;
  var hyperballValue = 25;
  var masterBallValue = 50;


  function getRandomPokemonId(){
    /** only spawn Pokemon that aren't already catched */ 
    let catchedPokemonIds = allCatchedPokemons.map( element => parseInt(element.id))
    do{
      /** harcoded the available API-url-IDs for performance and stability reasons.
    if this number changes regurarly, make API call for all pokemons and look at the lenth*/
      var randomID = getRandomInt(1, 899);
    }
    while(catchedPokemonIds.includes(randomID));
    return randomID;
  }

  const spawnPokemon = async () => {
    var spawnedPokemonId = getRandomPokemonId();
    async function fetchPokemonWithId(id){
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data =  await res.json();
      setCurrentPokemon(data);
    }
    fetchPokemonWithId(spawnedPokemonId);
  }

  const catchPokemon = (bonus) => {
    /** only catch pokemon if the current pokemon is loaded and if it's not already caught*/
    if(currentPokemon != null && allCatchedPokemons.indexOf(currentPokemon) == -1){

      switch(bonus){
        case pokeballValue:
          if (pokeballsLeft < 1){
            ToastsStore.error(`No Pokeballs left!`)
            return;
          }
          setPokeballsleft(oldValue => oldValue-1); break;
        case superballValue:
          if (superballsLeft < 1){
            ToastsStore.error(`No Superballs left!`)
            return;
          }
          setSuperballsleft(oldValue => oldValue-1); break;
        case hyperballValue:
          if (hyperballsLeft < 1){
            ToastsStore.error(`No Hyperballs left!`)
            return;
          }
          setHyperballsleft(oldValue => oldValue-1); break;
        case masterBallValue:
          if (masterballsLeft < 1){
            ToastsStore.error(`No Masterballs left!`)
            return;
          }
          setMasterballsleft(oldValue => oldValue-1); break;
      }
      /**propability of catching with normal pokeball: 50%
       * superball: adding 20% to the random propability
       * hyperball: adding 50% 
       * masterball: adding 100%
       *  */ 
      if(getRandomInt(0, 100) + bonus >= 50){
        ToastsStore.success(`Successfully catched ${currentPokemon.name}!`);
        setAllCatchedPokemons( currentList => [...currentList, currentPokemon]);
      }
      else{
        ToastsStore.error(`${currentPokemon.name} escaped! Better luck next time!`)
        spawnPokemon();
      }
    }
    else{
      ToastsStore.info(`You already catched ${currentPokemon.name}! Spawn another Pokemon!`)
    }
  }

  useEffect(() => {
  spawnPokemon()
  }, []);

  const RenderSpawnedPokemon = ({id, image, name, type }) => {
    const style = type + " thumb-container";
    return (
        <div className={style}>
            <div>ID: {id}</div>
            <img src={image} alt={name} />
            <div>
                <h2>{name}</h2>
                Type: {type}
            </div>
        </div>
    )
  }

  function CallPokemonRender(props){
    if(props.spawnPokemon != null){
      return (
        <RenderSpawnedPokemon
        key={currentPokemon.index}
        id={currentPokemon.id}
        image={currentPokemon.sprites["front_default"]}
        name={currentPokemon.name}
        type={currentPokemon.types[0].type.name}
        />
      );
    }
    else{
      return (
        <h1>Loading... (If this takes longer than a second, there might be an API connection error!</h1>
      );
    }
  }

  function RenderCatchedPokemon(props){
    return (
      <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> ID </th>
          <th> Type </th>
          <th> HP </th>
          <th> Attack </th>
          <th> Defense </th>
          <th> Special-Attack </th>
          <th> Special-Defense </th>
          <th> Speed </th>

        </tr>
      </thead>
      <tbody>
          {allCatchedPokemons.map((pokemonStats, index) =>
          <tr key={pokemonStats.id} >
          <td key={pokemonStats.id} className={pokemonStats.type}> {pokemonStats.name} </td>
          <td key={pokemonStats.id + 1000}> {pokemonStats.id} </td>
          <td key={pokemonStats.id + 2000}> {pokemonStats.types[0].type.name} </td>
          <td key={pokemonStats.id + 3000}> {pokemonStats.stats[0].base_stat} </td>
          <td key={pokemonStats.id + 4000}> {pokemonStats.stats[1].base_stat} </td>
          <td key={pokemonStats.id + 5000}> {pokemonStats.stats[2].base_stat} </td>
          <td key={pokemonStats.id + 6000}> {pokemonStats.stats[3].base_stat} </td>
          <td key={pokemonStats.id + 7000}> {pokemonStats.stats[4].base_stat} </td>
          <td key={pokemonStats.id + 8000}> {pokemonStats.stats[5].base_stat} </td>

          </tr> )}
        </tbody>
      </table>
    );
  }

  function Pokeball(){
    let classname = "";
    if(pokeballsLeft>0){
      classname = "pokeball";
    }
    return(
      <button className={classname} onClick={() => catchPokemon(pokeballValue)}>Catch with Pokeball <br /> {`(${pokeballsLeft} balls left)`} </button>
      )
  }

  function Superball(){
    let classname = "";
    if(superballsLeft>0){
      classname = "superball";
    }
    return(
      <button className={classname} onClick={() => catchPokemon(superballValue)}>Catch with Superball <br /> {`(${superballsLeft} balls left)`} </button>
      )
  }

  function Hyperball(){
    let classname = "";
    if(hyperballsLeft>0){
      classname = "hyperball";
    }
    return(
      <button className={classname} onClick={() => catchPokemon(hyperballValue)}>Catch with Hyperball <br /> {`(${hyperballsLeft} balls left)`} </button>
      )
  }

  function Masterball(){
    let classname = "";
    if(masterballsLeft>0){
      classname = "masterball";
    }
    return(
      <button className={classname} onClick={() => catchPokemon(masterBallValue)}>Catch with Masterball <br /> {`(${masterballsLeft} balls left)`} </button>
    )
  }

  return (
      <div>
        <div>
          <h1 className="header">Pokemon Catcher</h1>
          <button className="button-4" role="button" onClick={() => spawnPokemon()}> Spawn Pokemon </button>
        </div>
        <div className="all-container">
          <CallPokemonRender spawnPokemon={currentPokemon}></CallPokemonRender>
        </div>
        <div>
         <Pokeball></Pokeball>
         <Superball></Superball>
         <Hyperball></Hyperball>
         <Masterball></Masterball>
        </div>
        <div className="catched">
          <h1>Catched Pokemon</h1>
          <RenderCatchedPokemon></RenderCatchedPokemon>
          <ToastsContainer store={ToastsStore}/>
        </div>
    </div>
  );
}

export default App;