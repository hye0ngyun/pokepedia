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
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            marginRight={2}
          >
            Poképedia
          </Typography>
          <Stack direction="row" gap={1}>
            <Link href="/">Home</Link>
            <Link href="/type">Type</Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
