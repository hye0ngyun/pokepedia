import {
  LoadingPokemonAvatar,
  PokemonAvatar,
} from "@/components/server/pokemon-avatar";
import {
  LoadingPokemonAbilities,
  LoadingPokemonEvolutionChain,
  LoadingPokemonMoves,
  LoadingPokemonSpecies,
  LoadingPokemonStats,
  PokemonAbilities,
  PokemonEvolutionChain,
  PokemonMoves,
  PokemonSpecies,
  PokemonStats,
} from "@/components/server/pokemon-info";
import { Grid, Stack } from "@mui/material";
import { Suspense } from "react";

/**
 * 상세 페이지
 */
export default async function PokemonSpec({
  params,
}: {
  params: { name: string };
}) {
  const name = params?.name || "";

  return (
    <main>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Suspense fallback={<LoadingPokemonAvatar />}>
              <PokemonAvatar isSpec name={name} />
            </Suspense>
            <Suspense fallback={<LoadingPokemonAbilities />}>
              <PokemonAbilities name={name} />
            </Suspense>
            <Suspense fallback={<LoadingPokemonStats />}>
              <PokemonStats name={name} />
            </Suspense>
            <Suspense fallback={<LoadingPokemonSpecies />}>
              <PokemonSpecies name={name} />
            </Suspense>
            <Suspense fallback={<LoadingPokemonEvolutionChain />}>
              <PokemonEvolutionChain name={name} />
            </Suspense>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Suspense fallback={<LoadingPokemonMoves />}>
            <PokemonMoves name={name} />
          </Suspense>
        </Grid>
      </Grid>
    </main>
  );
}
