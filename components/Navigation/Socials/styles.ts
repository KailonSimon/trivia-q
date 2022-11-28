import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  socials: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "fit-content",
    width: "fit-content",
    marginTop: 8,
    gap: 4,
    color: theme.colors.green[5],
    [theme.fn.smallerThan("md")]: {
      marginTop: 0,
      paddingTop: "1rem",
    },
  },
}));
