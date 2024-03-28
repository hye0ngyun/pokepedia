import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import PokemonList, { LoadingList } from "@/components/server/pokemon-list";
import { Suspense } from "react";
import pokemonService from "@/lib/services/pokemonService";
import ListPagination from "@/components/client/pagination";

/**
 * 목록 페이지
 */
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = Math.ceil(
    (await pokemonService.getPokemonList()).count / 20
  );

  return (
    <main>
      <Image
        style={{
          margin: "40px auto",
          display: "block",
          maxWidth: "100%",
          objectFit: "contain",
        }}
        src={PokemonLogo}
        alt="pokemon logo"
        priority
      />
      <Suspense fallback={<LoadingList />}>
        <PokemonList page={currentPage} />
      </Suspense>
      <ListPagination totalPages={totalPages} />
    </main>
  );
}
