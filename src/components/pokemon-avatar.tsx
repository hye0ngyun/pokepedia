import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import pokemonService from "@/lib/services/pokemonService";
import Link from "next/link";
import { colorSets } from "@/lib/colorSets";
import Chip from "./ui/type-chip";
interface IPokemonAvatar {
  name: string;
  isSpec?: boolean;
}
export async function PokemonAvatar({ name, isSpec = false }: IPokemonAvatar) {
  const pokemonInfo = await pokemonService.getPokemon(name);

  const id = pokemonInfo.id + "";
  const imageUrl = pokemonInfo.sprites?.front_default ?? PokemonLogo;
  const types = pokemonInfo.types;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        minHeight: 300,
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
    >
      <Link scroll={false} href={isSpec ? "" : `/pokemon/${name}`}>
        <Box
          sx={{
            borderStartStartRadius: 5,
            borderTopRightRadius: 5,
            p: 2,
            transition: "0.35s",
            "&:hover": {
              bgcolor: isSpec ? "#fff" : "primary.light",
            },
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
          <Box
            sx={{
              minHeight: 85,
              typography: "h4",
              textAlign: "center",
              mb: 2,
            }}
          >
            {name}
          </Box>
        </Box>
      </Link>
      <Stack
        borderTop={1}
        borderColor="#EEEEEE"
        p={2}
        direction="row"
        gap={1}
        justifyContent="center"
      >
        {types?.map((type) => (
          <Link
            scroll={false}
            key={`${name}_${type.type.name}`}
            href={`/type/${type.type.name}`}
          >
            <Chip key={`${name}_${type.type.name}`} text={type.type.name} />
          </Link>
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
