import { Text } from "@mantine/core";
import Socials from "../Navigation/Socials/Socials";
import { useStyles } from "./styles";

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
