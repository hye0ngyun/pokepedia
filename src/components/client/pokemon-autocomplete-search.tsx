"use client";
import pokemonService from "@/lib/services/pokemonService";
import { getIdFromUrl } from "@/lib/utils";
import { Close, Search } from "@mui/icons-material";
import { Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TOption = {
  id: number;
  name: string;
  label: string;
};
export default function PokemonAutocompleteSearch() {
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [options, setOptions] = useState<TOption[]>();
  const getAllPokemons = async () => {
    const allPokemons = (await pokemonService.getPokemonList(0, 1302)).results;
    const options: TOption[] = allPokemons.map((pokemon) => {
      const id = getIdFromUrl(pokemon.url);
      return {
        id: id,
        name: pokemon.name,
        label: `#${id.toString().padStart(3, "0")} ${pokemon.name}`,
      };
    });
    setOptions(options);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      {options?.length ? (
        <>
          <Box
            sx={{
              "@media (max-width: 576px)": {
                px: isSearch ? 2 : 0,
                width: isSearch ? "calc(100% - 72px)" : 0,
                height: 56,
                overflow: isSearch ? "initial" : "hidden",
                position: "absolute",
                zIndex: 10,
                top: 0,
                left: 0,
                background: "#fff",
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box"
              options={options}
              sx={{
                width: 250,
                "@media (max-width: 576px)": {
                  width: "100%",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Search /> Pokemon Name
                    </Stack>
                  }
                />
              )}
              onChange={(event: any, newValue: TOption | null) => {
                if (!newValue) return;
                router.push(`/pokemon/${newValue?.name}`);
                setIsSearch(false);
              }}
              size="small"
            />
          </Box>
          <Box
            sx={{
              ml: "auto",
              "@media (min-width: 576px)": {
                width: 0,
                overflow: "hidden",
              },
            }}
          >
            <IconButton
              onClick={() => {
                setIsSearch((prev) => !prev);
              }}
            >
              {isSearch ? <Close /> : <Search />}
            </IconButton>
          </Box>
        </>
      ) : null}
    </>
  );
}
