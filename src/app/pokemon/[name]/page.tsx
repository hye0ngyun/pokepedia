"use client";
import ListPagination from "@/components/pagination";
/**
 * 상세 페이지
 */

import {
  LoadingPokemonAvatar,
  PokemonAvatar,
} from "@/components/pokemon-avatar";
import { LoadingPokemonStats, PokemonStats } from "@/components/pokemon-info";
import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function PokemonSpec() {
  const { name } = useParams<{ name: string }>();
  console.log(name);

  return (
    <main>
      <Stack>
        <Suspense fallback={<LoadingPokemonAvatar />}>
          <PokemonAvatar name={name} />
        </Suspense>
        <Suspense fallback={<LoadingPokemonStats />}>
          <PokemonStats name={name} />
        </Suspense>
      </Stack>
    </main>
  );
}
