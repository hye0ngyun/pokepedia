import { boxStyle } from "@/components/server/pokemon-info";
import TypeChip from "@/components/client/type-chip";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { colorSets } from '@/lib/utils';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Stack sx={boxStyle} p={2} mb={5}>
        <Typography mb={2}>All Types</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {Object.keys(colorSets).map((type) => (
            <Link scroll={false} key={`type_${type}`} href={`/type/${type}`}>
              <TypeChip text={type} />
            </Link>
          ))}
        </Stack>
      </Stack>
      {children}
    </main>
  );
}
