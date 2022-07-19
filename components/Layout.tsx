import { createStyles } from "@mantine/core";
import Footer from "./Footer";
import Navbar from "./Navigation/Navbar";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "fit-content",
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    marginTop: 64,
    maxWidth: "100vw",
    overflow: "hidden",
  },
}));

export default function Layout({ children }) {
  const { classes } = useStyles();
  return (
    <>
      <Navbar />
      <main id="main" className={classes.wrapper}>
        {children}
      </main>
      <Footer />
    </>
  );
}
