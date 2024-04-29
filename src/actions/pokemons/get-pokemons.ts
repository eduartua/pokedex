import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon"
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

// export const sleep = async() => {
//   return new Promise(resolve => setTimeout(resolve, 2000));
// }

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {

  // await sleep();

  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const PokeAPIPokemons = await Promise.all(pokemonPromises);
    const pokemons = PokeAPIPokemons.map((item) =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    console.log(pokemons[0]);
    

    return pokemons;
  } catch (error) {
    console.log(error);

    throw new Error("Error getting pokemons");

  }
}