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
    front_shiny: string;
    other: { dream_world: { front_default: string } };
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
  species: {
    name: string;
    url: string;
  };
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
  flavor_text_entries: IFlavorText[];
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

export interface IDamageRelations {
  double_damage_from: { name: string; url: string }[];
  double_damage_to: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  half_damage_to: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
  no_damage_to: { name: string; url: string }[];
}
interface IType {
  id: number;
  damage_relations: IDamageRelations;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
  name: string;
  names: IName[];
}
export interface IName {
  language: { name: string; url: string };
  name: string;
}
/** 타입 상세조회 */
async function getType(name: string): Promise<IType> {
  return fetch(`${BASE_URL}/type/${name}`).then((response) => response.json());
}

export interface IFlavorText {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version?: {
    name: string;
    url: string;
  };
  version_group?: {
    name: string;
    url: string;
  };
}
interface ISpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: {
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
  egg_groups: {
    name: string;
    url: string;
  }[];
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
  habitat: null;
  generation: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  flavor_text_entries: IFlavorText[];
  form_descriptions: {
    description: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
/** 종족 상세 조회 */
async function getSpecies(name: string | number): Promise<ISpecies> {
  return fetch(`${BASE_URL}/pokemon-species/${name}`).then((response) =>
    response.json()
  );
}

const services = {
  getPokemon,
  getPokemonList,
  getMove,
  getType,
  getSpecies,
};
export default services;
