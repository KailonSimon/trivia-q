import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu2, X } from "tabler-icons-react";
import { NavList } from "./NavList";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const links = [
    { text: "Home", href: "/" },
    { text: "Stats", href: "/stats" },
    { text: "Contact", href: "https://www.kailon.dev" },
  ];
  return (
    <>
      <header>
        <button id="menu-button" onClick={handleMenuClick}>
          {sidebarOpen ? <X /> : <Menu2 />}
        </button>
        <p className="logo">TriviaQ</p>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
          >
            <NavList links={links} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
