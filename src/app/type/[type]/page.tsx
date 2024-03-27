import {
  LoadingPokemonAvatar,
  PokemonAvatar,
} from "@/components/pokemon-avatar";
import TypeChip from "@/components/ui/type-chip";
import pokemonService from "@/lib/services/pokemonService";
import { IDamageRelations } from "@/lib/services/pokemonService/pokemonService";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

/**
 * 타입 검색 페이지
 */
export default async function Type({ params }: { params: { type: string } }) {
  const type = await pokemonService.getType(params.type);

  return (
    <Box>
      <Box component={Paper} p={2} mb={5}>
        <Typography mb={2}>Current Type</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <TypeChip text={type.name} />
          <span>Type Pokemon Total: {type.pokemon.length}</span>
        </Stack>
      </Box>

      <Compatibility relations={type.damage_relations} />
      <Grid p="10px 0" container spacing={2}>
        {type.pokemon.map(({ pokemon }, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`#${index}_${pokemon.name}`}
          >
            <Suspense fallback={<LoadingPokemonAvatar name={pokemon.name} />}>
              <PokemonAvatar name={pokemon.name} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

type TRelationKey =
  | "double_damage_from"
  | "double_damage_to"
  | "half_damage_from"
  | "half_damage_to"
  | "no_damage_from"
  | "no_damage_to";
function Compatibility({ relations }: { relations: IDamageRelations }) {
  return (
    <Stack gap={1} p={2} mb={5} divider={<Divider />} component={Paper}>
      <Typography mb={2}>Type Damage Relations</Typography>
      {Object.keys(relations).map((relation) => {
        const relationTypes = relations[relation as TRelationKey];
        return (
          <Stack direction="row" key={`${relation}`} gap={1}>
            <div>{relation}: </div>
            <Stack direction="row" gap={1}>
              {relationTypes.length
                ? relationTypes.map((type) => (
                    <Link key={type.name} href={`/type/${type.name}`}>
                      <TypeChip text={type.name} />
                    </Link>
                  ))
                : "No Type Exists"}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
