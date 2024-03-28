import TypeChip from "@/components/ui/type-chip";
import { colorSets } from "@/lib/colorSets";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Stack component={Paper} p={2} mb={5}>
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
