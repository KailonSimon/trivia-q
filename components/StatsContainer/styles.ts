import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    minHeight: "calc(100vh - 160px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    color: theme.colors.green[7],
  },
  chartWrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: 600,
    maxWidth: "100%",
  },
}));
