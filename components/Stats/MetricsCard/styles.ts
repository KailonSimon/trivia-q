import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 16,
    height: "20vh",
    minHeight: 150,
    aspectRatio: "1/1",
    background: "#37b24d",
    color: theme.white,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontWeight: 600,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  metricValue: {
    fontSize: "2rem",
  },
  icon: {
    height: "min-content",
  },
}));
