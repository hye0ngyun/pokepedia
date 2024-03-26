import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Stack direction="row" gap={2} alignItems="center">
            <Typography variant="h6" color="inherit" component="div">
              <Link href="/">Poképedia</Link>
            </Typography>
            <Link href="/type">Type</Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
