/**
 * 목록 페이지
 */

import Image, { StaticImageData } from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

const BASE_URL = "https://pokeapi.co/api/v2";

/** 포켓몬 목록조회 */
async function getPokemonList(offest = 0, limit = 20) {
  return fetch(`${BASE_URL}/pokemon?offset=${offest}&limit=${limit}`).then(
    (response) => response.json()
  );
}

interface IReulst {
  name: string;
  url: string;
}
interface IPokemon {
  count: number;
  next: null | string;
  previous: null | string;
  results: IReulst[];
}
export default async function List() {
  const pokemons: IPokemon = await getPokemonList();

  return (
    <main>
      <Image
        style={{
          margin: "40px auto",
          display: "block",
          maxWidth: "100%",
          objectFit: "contain",
        }}
        src={PokemonLogo}
        alt="pokemon logo"
      />
      <Grid p="10px 0" container spacing={2}>
        {pokemons?.results?.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Item key={`#${index}_${pokemon.name}`} name={pokemon.name} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
type TPokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
interface IItem {
  name: string;
}

/** 포켓몬 상세조회 */
async function getPokemon(name: string) {
  return fetch(`${BASE_URL}/pokemon/${name}`).then((response) =>
    response.json()
  );
}

async function Item({ name }: IItem) {
  const pokemonInfo = await getPokemon(name);

  const id = pokemonInfo?.id + "";
  const imageUrl = pokemonInfo?.sprites?.front_default ?? PokemonLogo;
  const types = pokemonInfo?.types;

  const colorSets: {
    [key: string]: string;
  } = {
    normal: "rgb(168, 167, 122)",
    grass: "rgb(122, 199, 76)",
    poison: "rgb(163, 62, 161)",
    fire: "rgb(238, 129, 48)",
    bug: "rgb(166, 185, 26)",
    flying: "rgb(169, 143, 243)",
    water: "rgb(99, 144, 240)",
    ice: "rgb(150, 217, 214)",
    steel: "rgb(183, 183, 206)",
    electric: "rgb(247, 208, 44)",
    ghost: "rgb(115, 87, 151)",
    rock: "rgb(182, 161, 54)",
    ground: "rgb(226, 191, 101)",
    phychic: "rgb(249, 85, 135)",
    fighting: "rgb(194, 46, 40)",
    fairy: "rgb(214, 133, 173)",
    dark: "rgb(112, 87, 70)",
    dragon: "rgb(111, 53, 252)",
    unknown: "rgb(117,159,145)",
    shadow: "rgb(62,51,69)",
  };

  return (
    <Link href={`/pokemon/${name}`}>
      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          minHeight: 300,
          boxShadow: "2px 2px 5px 2px #aaa3",
        }}
      >
        <Box>#{id.padStart(3, "0")}</Box>
        <Image
          style={{
            margin: "40px auto",
            display: "block",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          src={imageUrl}
          alt="pokemon logo"
          width={200}
          height={200}
        />
        <Box sx={{ typography: "h4", textAlign: "center", mb: 2 }}>{name}</Box>
        {/* <Box sx={{ typography: "body2", mb: 2 }}>desc</Box> */}
        <Stack direction="row" gap={1} justifyContent="center">
          {types?.map((type: TPokemonType) => (
            <Box
              key={`${name}_${type.type.name}`}
              sx={{
                bgcolor: colorSets[`${type.type.name}`],
                color: "#fff",
                borderRadius: 5,
                px: 2,
                py: 0.5,
              }}
            >
              {type.type.name}
            </Box>
          ))}
        </Stack>
      </Box>
    </Link>
  );
}
