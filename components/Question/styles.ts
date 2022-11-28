import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  questionWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fit-content",
    width: "100%",
    maxWidth: 600,
    textAlign: "center",
    padding: "1rem",
    borderRadius: 16,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
  },
  questionCategory: {
    marginBottom: 8,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
    letterSpacing: 1,
    fontFamily: "Righteous",
    color: theme.colorScheme === "dark" ? theme.colors.green[7] : theme.black,
  },
  questionText: {
    marginBottom: "2rem",
    maxWidth: "100%",
    overflowWrap: "break-word",
    fontSize: "1.25rem",
    fontWeight: 700,
    [theme.fn.smallerThan("md")]: {
      marginBottom: "1rem",
    },
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  answerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  answerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 25px",
    borderRadius: 32,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[3]
        : theme.colors.gray[9],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    position: "relative",
    fontWeight: 700,
    overflow: "hidden",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[4],
    },
  },
  correctAnswerButton: {
    backgroundColor: "green !important",
    border: "none !important",
    color: "white !important",
    "&:hover": {
      cursor: "initial !important",
    },
  },
  incorrectAnswerButton: {
    backgroundColor: "#E03131 !important",
    border: "none !important",
    color: "white !important",

    "&:hover": {
      cursor: "initial !important",
    },
  },
}));
