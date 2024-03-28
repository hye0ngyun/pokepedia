import { GitHub, Mail } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Box sx={{ bgcolor: "primary.main", color: "#fff", p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            <span>This Site Created By</span>{" "}
            <Link
              target="_blank"
              href="https://devinus.tistory.com"
              style={{ textDecoration: "underline" }}
            >
              Devinus
            </Link>
            .
          </Typography>
          <Stack direction="row" gap={1}>
            <Link target="_blank" href="https://github.com/hye0ngyun">
              <GitHub />
            </Link>
            <Link target="_blank" href="mailto:w.shin7271@gmail.com">
              <Mail />
            </Link>
          </Stack>
        </Stack>
      </Box>
    </footer>
  );
}
