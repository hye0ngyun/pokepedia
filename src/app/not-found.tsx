import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Image404 from "./404.webp";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function NotFound() {
  return (
    <Stack alignItems="center" gap={5} p={5}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h3">Page not found :(</Typography>
      <Box>The requested page could not be found.</Box>
      <Image src={Image404} alt="404 image" />
      {/* production error
      Link 컴포넌트를 사용하는 경우 "/a"와 같이 루트에서 404 페이지 접속 시
      Back to home 클릭 시 "/"으로 이동하긴 하지만, 페이지가 정상적으로 렌더되지 않고, 404 표현 남아있음
      */}
      <a href="/">
        <Button variant="contained">
          <ArrowBack sx={{ mr: 1 }} /> Back to home
        </Button>
      </a>
    </Stack>
  );
}
