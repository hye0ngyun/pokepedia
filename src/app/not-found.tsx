import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Image404 from "./404.webp";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function NotFound() {
  revalidatePath("/");
  return (
    <Stack alignItems="center" gap={5} p={5}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h3">Page not found :(</Typography>
      <Box>The requested page could not be found.</Box>
      <Image src={Image404} alt="404 image" />
      <Link href="/" replace scroll={false}>
        <Button variant="contained">
          <ArrowBack sx={{ mr: 1 }} /> Back to home
        </Button>
      </Link>
    </Stack>
  );
}
