import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import pokemonService from "@/lib/services/pokemonService";
import Link from "next/link";
import { colorSets } from "@/lib/colorSets";
import { Dispatch, SetStateAction, Suspense } from "react";
import { LoadingPokemonAvatar, PokemonAvatar } from "./pokemon-avatar";

export default async function PokemonList({
  page = 1,
}: {
  page: number;
}) {
  const offset = page * 20 - 20;
  const pokemons = await pokemonService.getPokemonList(offset);

  return (
    <Grid p="10px 0" container spacing={2}>
      {pokemons.results.map((pokemon, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={`#${index}_${pokemon.name}`}
        >
          <Suspense fallback={<LoadingPokemonAvatar name={pokemon.name} />}>
            <Link href={`/pokemon/${pokemon.name}`}>
              <PokemonAvatar name={pokemon.name} />
            </Link>
          </Suspense>
        </Grid>
      ))}
    </Grid>
  );
}

export function LoadingList() {
  return (
    <Grid p="10px 0" container spacing={2}>
      {Array.from(Array(20)).map((pokemon, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={`#${index}_${pokemon?.name}`}
        >
          <LoadingPokemonAvatar />
        </Grid>
      ))}
    </Grid>
  );
}
