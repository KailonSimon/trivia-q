import {
  Drawer,
  Burger,
  useMantineColorScheme,
  ActionIcon,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import NavLinks from "../NavLinks/NavLinks";
import Socials from "../Socials/Socials";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSession } from "next-auth/react";
import { getLevelFromXP, getLevelPercentage } from "../../../lib/utils";
import { useStyles } from "./styles";

export default function Navbar() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { data: session } = useSession();

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
        {session && (
          <div
            style={{
              position: "absolute",
              right: 48,
              height: "32px",
              width: "32px",
            }}
          >
            <CircularProgressbar
              value={getLevelPercentage(session.user.XP)}
              text={`${Math.floor(getLevelFromXP(session.user.XP))}`}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: dark ? "#51cf66" : "37b24d",
                trailColor: dark ? "#25262b" : "#fff",
                textColor: dark ? "#51cf66" : "37b24d",
                textSize: 36,
              })}
            />
          </div>
        )}
        <div className={classes.navToggle}>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            color="#51cf66"
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
