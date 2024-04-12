import { Grid } from "@mui/material";
import pokemonService from "@/lib/services/pokemonService";
import { Suspense } from "react";
import { LoadingPokemonAvatar, PokemonAvatar } from "./pokemon-avatar";

/** 포켓몬 목록 */
export default async function PokemonList({
  page = 1,
  limit = 20,
}: {
  page: number;
  limit: number;
}) {
  const offset = page * limit - limit;
  const pokemons = await pokemonService.getPokemonList(offset, limit);

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
            {/* <Link scroll={false} href={`/pokemon/${pokemon.name}`}> */}
            <PokemonAvatar name={pokemon.name} />
            {/* </Link> */}
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
