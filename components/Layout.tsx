import Footer from "./Footer";
import Navbar from "./Navigation/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
