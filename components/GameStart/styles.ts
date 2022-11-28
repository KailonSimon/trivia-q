import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: "fit-content",
    padding: "0 1rem",
  },
  container: {
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
  title: {
    marginBottom: "1rem",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
    letterSpacing: 1,
    fontSize: 26,
    fontFamily: "Righteous, sans-serif",
    color: theme.colors.green[7],
  },
  options: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing.md,
    width: "100%",
    maxWidth: 300,
  },
  button: {
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
  signedInText: {
    textAlign: "center",
  },
  userEmail: {
    fontWeight: 700,
    color: theme.colorScheme === "dark" ? theme.colors.green[7] : theme.black,
  },
}));
