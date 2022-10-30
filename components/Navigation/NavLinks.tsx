import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  navList: {
    display: "flex",
    gap: "3rem",
    color: theme.colors.green[5],
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5vh",
      flex: 1,
      marginTop: 64,
    },
  },
  navItem: {
    cursor: "pointer",
    fontWeight: 700,
  },
}));

const links = [
  { text: "Home", href: "/" },
  { text: "Stats", href: "/stats" },
  { text: "Contact", href: "https://www.kailon.dev" },
];

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

function NavLinks({ mobile, handleClick }) {
  const { classes } = useStyles();
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  if (mobile) {
    return (
      <motion.ul
        className={classes.navList}
        variants={list}
        initial="hidden"
        animate="show"
      >
        {links.map((link) => {
          return (
            <motion.li
              className={classes.navItem}
              key={link.text}
              variants={item}
            >
              {link.text == "Contact" ? (
                <a
                  href="https://www.kailon.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                >
                  {"Contact"}
                </a>
              ) : (
                <a href={link.href} onClick={handleClick}>
                  {link.text}
                </a>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }
  return (
    <ul className={classes.navList}>
      {links.map((link) => {
        return (
          <li className={classes.navItem} key={link.text}>
            {link.text == "Contact" ? (
              <a
                href="https://www.kailon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
              >
                {"Contact"}
              </a>
            ) : (
              <a href={link.href} onClick={handleClick}>
                {link.text}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
