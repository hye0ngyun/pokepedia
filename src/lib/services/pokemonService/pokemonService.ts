const BASE_URL = "https://pokeapi.co/api/v2";

interface IPokemon {
  count: number;
  next: null | string;
  previous: null | string;
  results: { name: string; url: string }[];
}
/** 포켓몬 목록조회 */
async function getPokemonList(offest = 0, limit = 20): Promise<IPokemon> {
  return fetch(`${BASE_URL}/pokemon?offset=${offest}&limit=${limit}`).then(
    (response) => response.json()
  );
}

interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface IPokemon {
  id: number;
  sprites: {
    front_default: string;
  };
  types: IPokemonType[];
}
/** 포켓몬 상세조회 */
async function getPokemon(name: string): Promise<IPokemon> {
  return fetch(`${BASE_URL}/pokemon/${name}`).then((response) =>
    response.json()
  );
}

const services = {
  getPokemon,
  getPokemonList,
};
export default services;
