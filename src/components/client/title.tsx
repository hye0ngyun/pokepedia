import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode | string }) {
  return (
    <Typography variant="h4" mb={1}>
      {children}
    </Typography>
  );
}
