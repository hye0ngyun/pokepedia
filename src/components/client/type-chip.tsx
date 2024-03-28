import { colorSets } from "@/lib/utils";
import { CircleOutlined } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import Image from "next/image";

export default function TypeChip({ text }: { text: string }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        bgcolor: colorSets[text] || "#000",
        color: "#fff",
        borderRadius: 5,
        px: 2,
        py: 0.1,
        fontVariant: "small-caps",
        display: "inline-flex",
        transition: "0.35s",
        "&:hover": {
          scale: "1.1",
        },
      }}
      fontSize="1.2rem"
    >
      <Image
        src={`/pokemon-types/${text.toLocaleUpperCase()}.png`}
        alt={`pokemon_type_${text}`}
        width={20}
        height={20}
      />
      <span style={{ paddingBottom: 3 }}>{text}</span>
    </Stack>
  );
}
