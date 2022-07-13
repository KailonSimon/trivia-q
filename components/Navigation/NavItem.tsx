import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const NavItem = ({ link }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="nav-link"
    >
      {link.text === "Contact" ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          Contact
        </a>
      ) : (
        <a href={link.href}>{link.text}</a>
      )}
    </motion.li>
  );
};
