import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import pokemonService from "@/lib/services/pokemonService";
import Link from "next/link";
import { colorSets } from "@/lib/colorSets";
interface IPokemonAvatar {
  name: string;
}
export async function PokemonAvatar({ name }: IPokemonAvatar) {
  const pokemonInfo = await pokemonService.getPokemon(name);

  const id = pokemonInfo.id + "";
  const imageUrl = pokemonInfo.sprites?.front_default ?? PokemonLogo;
  const types = pokemonInfo.types;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        minHeight: 300,
        height: "100%",
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
        priority
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
  );
}
export function LoadingPokemonAvatar({ name = "" }: { name?: string }) {
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
