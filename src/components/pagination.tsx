"use client";
import { Pagination, Stack } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListPagination({
  totalPages = 1,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(0);
  const router = useRouter();

  const createPageURL = (
    event: React.ChangeEvent<unknown>,
    value: number | string
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`/?page=${value}`);
    return `${pathname}?${params.toString()}`;
  };

  /**
   * 페이지네이션 이벤트
   */
  const onHandleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === page) return;
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/?page=${value}`);
  };
  /**
   * 페이지네이션 유지
   */
  useEffect(() => {
    if (!defaultPage) {
      router.replace(`/?page=1`);
    }
    setPage(defaultPage);
  }, [router, defaultPage]);
  return (
    <Stack>
      <Pagination
        defaultPage={defaultPage}
        count={totalPages}
        color="primary"
        onChange={onHandleChange}
        sx={{ mx: "auto" }}
        page={page}
      />
    </Stack>
  );
}
