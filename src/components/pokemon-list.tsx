import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import pokemonService from "@/lib/services/pokemonService";
import Link from "next/link";
import { colorSets } from "@/lib/colorSets";
import { Dispatch, SetStateAction, Suspense } from "react";

export default async function PokemonList({
  page = 1,
  setTotalPage,
}: {
  page: number;
  setTotalPage: Dispatch<SetStateAction<number>>;
}) {
  const offset = page * 20 - 20;
  const pokemons = await pokemonService.getPokemonList(offset);
  setTotalPage(Math.ceil(pokemons.count / 20));

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
          <Suspense fallback={<LoadingItem name={pokemon.name} />}>
            <Item name={pokemon.name} />
          </Suspense>
        </Grid>
      ))}
    </Grid>
  );
}

interface IItem {
  name: string;
}
async function Item({ name }: IItem) {
  const pokemonInfo = await pokemonService.getPokemon(name);

  const id = pokemonInfo.id + "";
  const imageUrl = pokemonInfo.sprites?.front_default ?? PokemonLogo;
  const types = pokemonInfo.types;

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
        <Stack direction="row" gap={1} justifyContent="center">
          {types?.map((type) => (
            <Box
              key={`${name}_${type.type.name}`}
              sx={{
                bgcolor: colorSets[`${type.type.name}`],
                color: "#fff",
                borderRadius: 5,
                px: 2,
                pb: 0.3,
                pt: 0.1,
                fontVariant: "small-caps",
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
function LoadingItem({ name = "" }: { name?: string }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        minHeight: 300,
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
    >
      <Skeleton width={50} height={30} />
      <Skeleton
        style={{
          margin: "40px auto",
          display: "block",
          maxWidth: "100%",
          objectFit: "contain",
          width: 200,
          height: 200,
          borderRadius: "full",
        }}
        variant="circular"
      />
      {name ? (
        <Box sx={{ typography: "h4", textAlign: "center", mb: 2 }}>{name}</Box>
      ) : (
        <Skeleton
          width={150}
          height={50}
          sx={{
            textAlign: "center",
            mx: "auto",
          }}
        />
      )}
      <Stack direction="row" gap={1} justifyContent="center">
        <Skeleton width={70} height={40} />
        <Skeleton width={70} height={40} />
      </Stack>
    </Box>
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
          <LoadingItem />
        </Grid>
      ))}
    </Grid>
  );
}
