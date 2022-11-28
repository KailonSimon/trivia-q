import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    height: "100%",
    minHeight: "fit-content",
    maxWidth: "100vw",
    overflow: "hidden",
    padding: "1rem",
  },
  scoreboard: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 600,
    padding: "1rem 0",
    marginBottom: "1rem",
  },
  difficultyBadge: {
    border: "1px solid transparent",
    fontSize: "0.75rem",
    height: 32,
    lineHeight: 30,
    padding: "0 1rem",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    textTransform: "uppercase",
    borderRadius: 32,
    fontWeight: 700,
    letterSpacing: 0.25,
    color: theme.white,
  },
  badgeEasy: {
    background: "green",
  },
  badgeMedium: {
    background: "orange",
  },
  badgeHard: {
    background: "#E03131",
  },
  nextButtonContainer: {
    height: 90,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "1rem 0",
  },
  nextButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 25px",
    borderRadius: 32,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    position: "relative",
    fontWeight: 700,
    overflow: "hidden",
    zIndex: 1,
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      cursor: "pointer",
    },
  },
  modal: {
    borderRadius: 16,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
  },
}));
