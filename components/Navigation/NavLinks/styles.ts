import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  navList: {
    display: "flex",
    gap: "3rem",
    color: theme.colors.green[5],
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5vh",
      flex: 1,
      marginTop: 64,
    },
  },
  navItem: {
    cursor: "pointer",
    fontWeight: 700,
  },
}));
