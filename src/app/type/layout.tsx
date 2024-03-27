import TypeChip from "@/components/ui/type-chip";
import { colorSets } from "@/lib/colorSets";
import { Grid, Paper, Stack } from "@mui/material";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        component={Paper}
        p={1}
        mb={2}
      >
        {Object.keys(colorSets).map((type) => (
          <Link key={`type_${type}`} href={`/type/${type}`}>
            <TypeChip text={type} />
          </Link>
        ))}
      </Stack>
      {children}
    </main>
  );
}
