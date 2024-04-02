import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import pokemonService from "@/lib/services/pokemonService";
import Link from "next/link";
import Chip from "../client/type-chip";
import { getFlavorText, getIdFromUrl, getName } from "@/lib/utils";
interface IPokemonAvatar {
  name: string;
  isSpec?: boolean;
}
export async function PokemonAvatar({ name, isSpec = false }: IPokemonAvatar) {
  const pokemonInfo = await pokemonService.getPokemon(name);
  const species = pokemonInfo.species;
  const speciesId = getIdFromUrl(species.url);
  const pokemonSpecies = await pokemonService.getSpecies(speciesId);

  const id = pokemonInfo.id + "";
  const imageUrl = pokemonInfo.sprites?.front_default ?? PokemonLogo;
  const hoverImageUrl =
    (pokemonInfo.sprites?.other.dream_world.front_default ||
      pokemonInfo.sprites?.front_shiny ||
      imageUrl) ??
    PokemonLogo;
  const types = pokemonInfo.types;

  return (
    <Stack
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        minHeight: 300,
        height: "100%",
        boxShadow: "2px 2px 5px 2px #aaa3",
      }}
    >
      <Link
        scroll={false}
        href={isSpec ? "" : `/pokemon/${name}`}
        style={{ flexGrow: 1 }}
      >
        <Box
          sx={{
            borderStartStartRadius: 5,
            borderTopRightRadius: 5,
            p: 2,
            height: "100%",
            transition: "0.35s",
            position: "relative",
            "& .hoverImage": {
              opacity: 0,
              display: "none",
              visibility: "hidden",
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            },
            "& .originImage": {
              opacity: 1,
              visibility: "visible",
            },
            "&:hover": {
              bgcolor: isSpec ? "#fff" : "primary.light",
              "& .hoverImage": {
                opacity: 1,
                visibility: "visible",
              },
              "& .originImage": {
                opacity: 0,
                visibility: "hidden",
              },
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Box>#{id.padStart(3, "0")}</Box>
            <Box>종족: {getName(pokemonSpecies.names)}</Box>
          </Stack>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Image
              className="originImage"
              style={{
                margin: "40px auto",
                display: "block",
                maxWidth: "100%",
                objectFit: "contain",
                transition: "0.35s",
              }}
              src={imageUrl}
              alt="pokemon logo"
              width={200}
              height={200}
            />
            <Image
              className="hoverImage"
              style={{
                display: "block",
                maxWidth: "100%",
                objectFit: "contain",
                transition: "0.35s",
              }}
              src={hoverImageUrl}
              alt="pokemon logo"
              width={200}
              height={200}
              priority={isSpec}
            />
          </Box>
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
          <Typography
            variant="body2"
            sx={{ wordBreak: "keep-all", textAlign: "center" }}
          >
            {getFlavorText(pokemonSpecies.flavor_text_entries)}
          </Typography>
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
    </Stack>
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
