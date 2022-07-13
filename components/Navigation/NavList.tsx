import { motion } from "framer-motion";
import { NavItem } from "./NavItem";

const variants = {
  open: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 1,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      when: "afterChildren",
      staggerChildren: 1,
      staggerDirection: -1,
    },
  },
};

type link = {
  text: string;
  href: string;
};

export const NavList = ({ links }) => (
  <nav>
    <motion.ul variants={variants} className="nav-links">
      {links.map((link: link) => (
        <NavItem link={link} key={link.text} />
      ))}
    </motion.ul>
  </nav>
);
