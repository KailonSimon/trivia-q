import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar/Navbar";
import { useStyles } from "./styles";

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
