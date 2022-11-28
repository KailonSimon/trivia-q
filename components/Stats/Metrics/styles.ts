import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  embla: {
    position: "relative",
    padding: 8,
    width: "100%",
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    borderRadius: 16,
  },
  title: {
    color: theme.colorScheme === "dark" ? theme.colors.green[7] : theme.black,
    marginBottom: "0.5rem",
    textAlign: "center",
  },
}));
