import { colorSets } from "@/lib/colorSets";
import { Box } from "@mui/material";

export default function TypeChip({ text }: { text: string }) {
  return (
    <Box
      sx={{
        bgcolor: colorSets[text] || "#000",
        color: "#fff",
        borderRadius: 5,
        px: 2,
        pb: 0.3,
        pt: 0.1,
        fontVariant: "small-caps",
        display: "inline-flex",
        transition: "0.35s",
        "&:hover": {
          scale: "1.1",
        },
      }}
    >
      {text}
    </Box>
  );
}
