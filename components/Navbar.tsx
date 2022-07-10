import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu2, X } from "tabler-icons-react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinks = {
    visible: { opacity: 1, scale: 1 },
    hover: { opacity: 1, scale: 1.2 },
  };

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
            layout
          >
            <div className="sidebar-content">
              <nav>
                <ul className="nav-links" onClick={handleMenuClick}>
                  <motion.li
                    className="nav-link"
                    variants={navLinks}
                    initial="visible"
                    whileHover="hover"
                  >
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </motion.li>
                  {/*<motion.li
                    className="nav-link"
                    variants={navLinks}
                    initial="visible"
                    whileHover="hover"
                  >
                    <Link href="/stats">
                      <a>Stats</a>
                    </Link>
        </motion.li>*/}
                  <motion.li
                    className="nav-link"
                    variants={navLinks}
                    initial="visible"
                    whileHover="hover"
                  >
                    <a
                      href="https://www.kailon.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact
                    </a>
                  </motion.li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
