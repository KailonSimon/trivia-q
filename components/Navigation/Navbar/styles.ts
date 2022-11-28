import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
    zIndex: 2,
  },
  nav: {
    height: "4rem",
    width: "calc(100% - 2rem)",
    maxWidth: 1280,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
    position: "relative",
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5vh",
    width: "100%",
    height: "80%",
  },
  logo: {
    fontSize: "1.25rem",
    fontFamily: "Righteous",
    letterSpacing: 1,
  },
  menu: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
      border: "1px solid red",
    },
  },
  navToggle: {
    display: "flex",
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  themeToggleMobile: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  themeToggleDesktop: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  drawer: {
    display: "flex",
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
    height: "calc(100vh - 4rem - 1px)",
    marginTop: "calc(4rem + 1px)",
  },
}));
