"use client";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ListFilter({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();
  const [value, setValue] = useState(20);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const onChangeSelect = (v: SelectChangeEvent<number>): void => {
    const itemParam = Number(v.target.value);
    router.push(
      `${pathname}?${createQueryString("limit", itemParam.toString())}`
    );
    setValue(itemParam);
  };

  useEffect(() => {
    if (totalPages < currentPage) {
      router.push(
        `${pathname}?${createQueryString("page", totalPages.toString())}`
      );
    }
    setValue(Number(searchParams.get("limit")) || 20);
  }, [totalPages]);
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography>
          <Box component="span" color="primary.main">
            {currentPage}
          </Box>{" "}
          / {totalPages}
        </Typography>
      </Box>
      <Box>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Page Per View"
          size="small"
          onChange={onChangeSelect}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </Box>
    </Stack>
  );
}
