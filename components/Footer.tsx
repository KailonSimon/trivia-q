import { createStyles, Text } from "@mantine/core";
import Socials from "./Navigation/Socials";

const useStyles = createStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: 400,
    minHeight: 128,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
    padding: "1rem",
    zIndex: 998,
    position: "relative",
    bottom: 0,
  },
}));

export default function Footer() {
  const { classes } = useStyles();
  const today = new Date();
  return (
    <div className={classes.footer} id="footer">
      <Text>{`Designed & Built by Kailon Simon © ${today.getFullYear()}`}</Text>
      <Socials />
    </div>
  );
}
