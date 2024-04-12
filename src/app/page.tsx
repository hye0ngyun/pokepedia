import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import PokemonList, { LoadingList } from "@/components/server/pokemon-list";
import { Suspense } from "react";
import pokemonService from "@/lib/services/pokemonService";
import ListPagination from "@/components/client/pagination";
import ListFilter from "@/components/client/list-filter";

/**
 * 목록 페이지
 */
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const offset = Number(searchParams?.page) * limit - limit || 0;

  const totalPages = Math.ceil(
    (await pokemonService.getPokemonList(offset, limit)).count / limit
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
      <ListFilter currentPage={currentPage} totalPages={totalPages} />
      <Suspense fallback={<LoadingList />}>
        <PokemonList page={currentPage} limit={limit} />
      </Suspense>
      <ListPagination totalPages={totalPages} />
    </main>
  );
}
