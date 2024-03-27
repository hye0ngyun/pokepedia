import pokemonService from "@/lib/services/pokemonService";
import { LinearProgress, Skeleton, Stack, Typography } from "@mui/material";

export async function PokemonStats({ name }: { name: string }) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  return (
    <Stack gap={1}>
      <Typography variant="h4" mb={1}>
        Base Stats
      </Typography>
      {pokemonInfo.stats.map((stat) => (
        <Stack key={`${name}_${stat.stat.name}`}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{stat.stat.name}</Typography>
            <Typography variant="h6">{stat.base_stat}</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={stat.base_stat} />
        </Stack>
      ))}
    </Stack>
  );
}
export function LoadingPokemonStats() {
  return (
    <Stack gap={1}>
      <Typography variant="h4" mb={1}>
        Base Stats
      </Typography>
      {Array.from(Array(6)).map((stat, index) => (
        <Stack key={`skeleton_stat_${index}`}>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton width={100} height={30}></Skeleton>
            <Skeleton width={30} height={30}></Skeleton>
          </Stack>
          <LinearProgress variant="determinate" value={(index + 1) * 15} />
        </Stack>
      ))}
    </Stack>
  );
}
