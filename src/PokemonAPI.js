import { Pokedex } from 'pokeapi-js-wrapper';




export const getPokemonListAPI = async () => {
    const Pokedex = require("pokeapi-js-wrapper");
    const P = new Pokedex.Pokedex();
    const { results } = await P.getPokemonsList({ limit: 10000 });
    return results;
  }

export const getPokemonByNameAPI = async (pokemonName) => {
    const Pokedex = require("pokeapi-js-wrapper");
    const P = new Pokedex.Pokedex();
    return await P.getPokemonByName(pokemonName);
}