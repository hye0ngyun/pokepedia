"use client";
import { Pagination, Stack } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  /**
   * 페이지네이션 이벤트
   */
  const onHandleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === page) return;
    router.push(`${pathname}?${createQueryString("page", value.toString())}`);
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  /**
   * 페이지네이션 유지
   */
  useEffect(() => {
    if (!defaultPage) {
      router.replace(`${pathname}?page=1`);
    }
    setPage(defaultPage);
  }, [router, defaultPage, pathname]);
  return (
    <Stack mt={5}>
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
