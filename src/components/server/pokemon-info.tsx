import pokemonService from "@/lib/services/pokemonService";
import { getFlavorText, getIdFromUrl } from "@/lib/utils";
import { East, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const boxStyle = {
  bgcolor: "#fff",
  p: 2,
  borderRadius: 2,
  boxShadow: "2px 2px 5px 2px #aaa3",
};

interface IProps {
  name: string;
}
/** stats */
export async function PokemonStats({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  return (
    <Stack sx={boxStyle} gap={1}>
      <Typography variant="h4" mb={1}>
        Base Stats
      </Typography>
      {pokemonInfo.stats.map((stat) => (
        <Stack key={`${name}_stat_${stat.stat.name}`}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{stat.stat.name}</Typography>
            <Typography variant="h6">{stat.base_stat}</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={stat.base_stat / 2}
            color={stat.base_stat / 2 >= 50 ? "secondary" : "primary"}
          />
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

/** abilities */
export async function PokemonAbilities({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);

  return (
    <Stack sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Abilities
      </Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {pokemonInfo.abilities.map((ability, index) => (
          <Typography
            key={`${name}_ability_${ability.ability.name}`}
            variant="h6"
          >
            {ability.ability.name}
            {pokemonInfo.abilities.length - 1 !== index && ","}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
export function LoadingPokemonAbilities() {
  return (
    <Stack>
      <Typography variant="h4" mb={1}>
        Abilities
      </Typography>
      <Stack direction="row" gap={1}>
        {Array.from(Array(3)).map((ability, index) => (
          <Skeleton
            key={`skeleton_ability_${index}`}
            width={100}
            height={30}
          ></Skeleton>
        ))}
      </Stack>
    </Stack>
  );
}

/** moves */
export async function PokemonMoves({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  return (
    <Box sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Moves
      </Typography>
      {pokemonInfo.moves.map((move) => {
        const splitUrls = move.move.url.split("/");
        const moveId = Number(splitUrls[splitUrls.length - 2]);
        return (
          <Suspense key={move.move.name} fallback={<LoadingPokemonMove />}>
            <PokemonMove id={moveId} />
          </Suspense>
        );
      })}
    </Box>
  );
}
export function LoadingPokemonMoves() {
  return (
    <Box sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Moves
      </Typography>
      {Array.from(Array(10)).map((move, index) => (
        <LoadingPokemonMove key={`skeleton_moves_${index}`} />
      ))}
    </Box>
  );
}

async function PokemonMove({ id }: { id: number }) {
  const move = await pokemonService.getMove(id);

  const columns = [
    {
      header: "power",
      data: move.power,
    },
    {
      header: "accuracy",
      data: move.accuracy,
    },
    {
      header: "pp",
      data: move.pp,
    },
    {
      header: "type",
      data: move.type.name,
    },
    {
      header: "category",
      data: move.meta?.category.name || "",
    },
  ];

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`move_${move.name}`}
        id={`move_${move.name}`}
      >
        <Typography fontWeight="600">{move.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <p>description: {getFlavorText(move.flavor_text_entries)}</p>
        <Box sx={{ overflowX: "scroll" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={`#${id}_move_${move.name}_head_${
                      column.header || index
                    }`}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {/* <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell>
              <TableCell>a</TableCell> */}
                {columns.map((column, index) => (
                  <TableCell
                    key={`#${id}_move_${move.name}_${column.header}_data_${
                      column.data || index
                    }`}
                  >
                    {column.data}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
export function LoadingPokemonMove() {
  return <Skeleton height={50} />;
}

/** species */
export async function PokemonSpecies({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  const species = pokemonInfo.species;
  const speciesId = getIdFromUrl(species.url);
  const pokemonSpecies = await pokemonService.getSpecies(speciesId);
  return (
    <Box sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Species
      </Typography>
      <Stack flexWrap="wrap" direction="row" gap={1}>
        {pokemonSpecies.varieties.map((variety) => (
          <Suspense key={`${name}_species_${variety.pokemon.name}`}>
            <PokemonEvolutionInfo isFirst name={variety.pokemon.name} />
          </Suspense>
        ))}
      </Stack>
    </Box>
  );
}
export function LoadingPokemonSpecies() {
  return (
    <Box sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Species
      </Typography>
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
    </Box>
  );
}

/** evolution-chain */
export async function PokemonEvolutionChain({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  const species = pokemonInfo.species;
  const speciesId = getIdFromUrl(species.url);
  const pokemonSpecies = await pokemonService.getSpecies(speciesId);
  const evolutionChainId = getIdFromUrl(pokemonSpecies.evolution_chain.url);
  const pokemonEvolutionChain = await pokemonService.getEvolutionChain(
    evolutionChainId
  );
  return (
    <Stack sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Evolution Chain
      </Typography>
      <Stack direction="row" sx={{ overflowX: "auto" }}>
        {/* gen1 */}
        <Stack justifyContent="center">
          {/* <Typography variant="h5">gen1</Typography> */}
          <Suspense fallback="...">
            <PokemonEvolutionInfo
              isFirst
              name={pokemonEvolutionChain.chain.species.name}
            />
          </Suspense>
        </Stack>
        {pokemonEvolutionChain.chain.evolves_to.length ? (
          <>
            {/* gen2 */}
            <Stack>
              {/* <Typography variant="h5">gen2</Typography> */}
              {pokemonEvolutionChain.chain.evolves_to.map((evolve) => {
                return (
                  <Stack
                    direction="row"
                    key={`evloution_${name}_${evolve.species.name}`}
                  >
                    <Suspense>
                      <PokemonEvolutionInfo name={evolve.species.name} />
                    </Suspense>
                    {evolve?.evolves_to.length ? (
                      <Stack>
                        {/* <Typography variant="h5">gen3</Typography> */}
                        {evolve?.evolves_to.map((deepEvolve) => (
                          <Suspense
                            key={`evolution_${name}_${deepEvolve.species.name}`}
                          >
                            <PokemonEvolutionInfo
                              name={deepEvolve.species.name}
                            />
                          </Suspense>
                        ))}
                      </Stack>
                    ) : null}
                  </Stack>
                );
              })}
            </Stack>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
}
export function LoadingPokemonEvolutionChain() {
  return (
    <Box sx={boxStyle}>
      <Typography variant="h4" mb={1}>
        Species
      </Typography>
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
    </Box>
  );
}
async function PokemonEvolutionInfo({
  name,
  isFirst = false,
}: {
  name: string;
  isFirst?: boolean;
}) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  const imageUrl =
    pokemonInfo.sprites.other.showdown.front_default ??
    pokemonInfo.sprites?.front_default;
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {!isFirst ? <East /> : null}
      <Link href={`/pokemon/${name}`}>
        <Stack alignItems="center" gap={1}>
          <Stack
            sx={{
              height: 100,
              px: 3,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={imageUrl}
              alt={`${name}_image`}
              width={200}
              height={200}
              style={{ width: "fit-content", height: "auto" }}
            />
          </Stack>
          {name}
        </Stack>
      </Link>
    </Stack>
  );
}
