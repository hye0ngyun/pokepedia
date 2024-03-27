import {
  LoadingPokemonAvatar,
  PokemonAvatar,
} from "@/components/pokemon-avatar";
import {
  LoadingPokemonAbilities,
  LoadingPokemonMoves,
  LoadingPokemonStats,
  PokemonAbilities,
  PokemonMoves,
  PokemonStats,
} from "@/components/pokemon-info";
import { Grid, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { Suspense } from "react";

/**
 * 상세 페이지
 */
export default function PokemonSpec({ params }: { params: { name: string } }) {
  const name = params?.name || "";

  return (
    <main>
      <Grid container spacing={2} py={5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Suspense fallback={<LoadingPokemonAvatar />}>
              <PokemonAvatar name={name} />
            </Suspense>
            <Suspense fallback={<LoadingPokemonAbilities />}>
              <PokemonAbilities name={name} />
            </Suspense>
            <Suspense fallback={<LoadingPokemonStats />}>
              <PokemonStats name={name} />
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
