"use client";
import Image from "next/image";
import PokemonLogo from "/public/pokemon-logo.png";
import PokemonList, { LoadingList } from "@/components/pokemon-list";
import { Suspense, useState } from "react";
import {
  Button,
  CircularProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";

/**
 * 목록 페이지
 */
export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const onHandleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === page) return;
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
        <PokemonList page={page} setTotalPage={setTotalPage} />
      </Suspense>
      <Stack>
        <Pagination
          defaultPage={1}
          count={totalPage}
          color="primary"
          onChange={onHandleChange}
          sx={{ mx: "auto" }}
        />
      </Stack>
    </main>
  );
}
