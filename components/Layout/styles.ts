import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "calc(100vh - 64px)",
    minHeight: "calc(100vh - 64px)",
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    marginTop: 65,
    maxWidth: "100vw",
    overflow: "hidden",
  },
}));
