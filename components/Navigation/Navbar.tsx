import {
  Drawer,
  Burger,
  useMantineColorScheme,
  ActionIcon,
  createStyles,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import NavLinks from "./NavLinks";
import Socials from "./Socials";

const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
  },
  nav: {
    height: "4rem",
    width: "calc(100% - 2rem)",
    maxWidth: 1280,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5vh",
    width: "100%",
    height: "100%",
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
  },
}));

export default function Navbar() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.themeToggleMobile}>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
        </div>
        <div>
          <Anchor
            className={classes.logo}
            href="/"
            underline={false}
            color="green"
          >
            TriviaQ
          </Anchor>
        </div>
        <div className={classes.menu} id="nav-menu">
          <NavLinks mobile={false} handleClick={() => setOpened(!opened)} />
        </div>
        <div className={classes.themeToggleDesktop}>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
        </div>
        <div className={classes.navToggle}>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
          />
        </div>
      </nav>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size="full"
        withOverlay={false}
        transition="slide-left"
        styles={{
          closeButton: { display: "none" },
          header: { display: "none" },
        }}
        classNames={{ drawer: classes.drawer }}
      >
        <div className={classes.drawerContent}>
          <NavLinks mobile={true} handleClick={() => setOpened(!opened)} />
          <Socials />
        </div>
      </Drawer>
    </header>
  );
}
