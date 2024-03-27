import pokemonService from "@/lib/services/pokemonService";
import { ExpandMore } from "@mui/icons-material";
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
import { Suspense } from "react";
interface IProps {
  name: string;
}
/** stats */
export async function PokemonStats({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  return (
    <Stack
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
      gap={1}
    >
      <Typography variant="h4" mb={1}>
        Base Stats
      </Typography>
      {pokemonInfo.stats.map((stat) => (
        <Stack key={`${name}_stat_${stat.stat.name}`}>
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

/** abilities */
export async function PokemonAbilities({ name }: IProps) {
  const pokemonInfo = await pokemonService.getPokemon(name);

  return (
    <Stack
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
    >
      <Typography variant="h4" mb={1}>
        Abilities
      </Typography>
      <Stack direction="row" gap={1}>
        {pokemonInfo.abilities.map((ability) => (
          <Typography
            key={`${name}_ability_${ability.ability.name}`}
            variant="h6"
          >
            {ability.ability.name}
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
    <Box
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
    >
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
    <Box
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
    >
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
        {move.name}
      </AccordionSummary>
      <AccordionDetails>
        <p>
          description:{" "}
          {move.flavor_text_entries.find((el) => el.language.name === "en")
            ?.flavor_text ||
            move.flavor_text_entries.find((el) => el.language.name === "ko")
              ?.flavor_text}
        </p>
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
