import { BrandGithub, BrandLinkedin } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  socials: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "fit-content",
    width: "fit-content",
    marginTop: 8,
    gap: 4,
    [theme.fn.smallerThan("md")]: {
      marginTop: 0,
      padding: "1rem 0",
    },
  },
}));

function Socials() {
  const { classes } = useStyles();
  const matches = useMediaQuery("(max-width: 900px)", false);
  return (
    <div className={classes.socials}>
      <a
        href="https://github.com/KailonSimon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BrandGithub size={matches ? "4vh" : 30} />
      </a>
      <a
        href="https://www.linkedin.com/in/kailon-simon-59b416230/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BrandLinkedin size={matches ? "4vh" : 30} />
      </a>
    </div>
  );
}

export default Socials;
