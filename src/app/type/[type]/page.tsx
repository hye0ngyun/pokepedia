import {
  LoadingPokemonAvatar,
  PokemonAvatar,
} from "@/components/pokemon-avatar";
import TypeChip from "@/components/ui/type-chip";
import pokemonService from "@/lib/services/pokemonService";
import { IDamageRelations } from "@/lib/services/pokemonService/pokemonService";
import { Box, Grid, Stack } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

/**
 * 타입 검색 페이지
 */
export default async function Type({ params }: { params: { type: string } }) {
  const type = await pokemonService.getType(params.type);

  return (
    <Box>
      <Stack direction="row" gap={1} mb={2} alignItems="center">
        <TypeChip text={type.name} />
        <span>Type Pokemon Total: {type.pokemon.length}</span>
      </Stack>

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
    <Stack gap={1} mb={1}>
      {Object.keys(relations).map((relation) => {
        return (
          <Stack direction="row" key={`${relation}`} gap={1}>
            <div>{relation}: </div>
            <Stack direction="row" gap={1}>
              {relations[relation as TRelationKey].map((type) => (
                <Link key={type.name} href={`/type/${type.name}`}>
                  <TypeChip text={type.name} />
                </Link>
              ))}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
