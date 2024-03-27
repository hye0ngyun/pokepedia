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
interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
interface IAbilitie {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
interface IPokemon {
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: IPokemonType[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  stats: IPokemonStat[];
  abilities: IAbilitie[];
}
/** 포켓몬 상세조회 */
async function getPokemon(name: string): Promise<IPokemon> {
  return fetch(`${BASE_URL}/pokemon/${name}`).then((response) =>
    response.json()
  );
}

interface IMove {
  id: number;
  name: string;
  accuracy?: number;
  power?: number;
  pp?: number;
  priority?: number;
  target: {
    name: string;
    url: string;
  };
  type: {
    name: string;
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
  meta: {
    category: {
      name: string;
      url: string;
    };
  };
}
/** 포켓몬 행동 상세조회 */
async function getMove(id: number): Promise<IMove> {
  return fetch(`${BASE_URL}/move/${id}`).then((response) => response.json());
}

const services = {
  getPokemon,
  getPokemonList,
  getMove,
};
export default services;
