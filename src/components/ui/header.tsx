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
        <Toolbar variant="regular">
          <Stack direction="row" gap={2} alignItems="center">
            <Link href="/">
              <Typography
                variant="h4"
                color="inherit"
                component="div"
                sx={{
                  transition: "0.35s",
                  "&:hover": {
                    filter: "drop-shadow(2px 2px 10px #333a)",
                  },
                }}
              >
                Poképedia
              </Typography>
            </Link>
            <Box
              sx={{
                width: "1px",
                height: 15,
                backgroundColor: "#FFF",
              }}
            ></Box>
            <Link href="/type">
              <Box
                sx={{
                  transition: "0.35s",
                  "&:hover": {
                    filter: "drop-shadow(2px 2px 10px #333a)",
                  },
                }}
              >
                TYPE
              </Box>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
