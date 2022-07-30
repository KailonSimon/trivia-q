import { signOut, useSession } from "next-auth/react";
import { useAppDispatch } from "../services/hooks";
import { createStyles, Title, Text } from "@mantine/core";
import { startGame } from "../services/redux/gameSlice";
import { motion } from "framer-motion";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    height: "100%",
    minHeight: "fit-content",
    padding: "0 1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fit-content",
    width: "100%",
    maxWidth: 600,
    textAlign: "center",
    padding: "1rem",
    borderRadius: 16,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
  },
  title: {
    marginBottom: "1rem",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
    letterSpacing: 1,
    fontSize: 26,
    fontFamily: "Righteous, sans-serif",
    color: theme.colors.green[7],
  },
  options: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing.md,
    width: "100%",
    maxWidth: 300,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 25px",
    borderRadius: 32,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    position: "relative",
    fontWeight: 900,
    transition: "all 500ms",
    overflow: "hidden",
    zIndex: 1,
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      cursor: "pointer",
    },
  },
  signedInText: {
    textAlign: "center",
  },
  userEmail: {
    fontWeight: 700,
    color: theme.colorScheme === "dark" ? theme.colors.green[7] : theme.black,
  },
}));
function GameStart({ refetch }) {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleStartGame = () => {
    refetch();
    dispatch(startGame());
  };

  return (
    <motion.div
      className={classes.content}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <div className={classes.container}>
        <Text order={1} className={classes.title} component={Title}>
          TriviaQ
        </Text>
        <div className={classes.options}>
          <button className={classes.button} onClick={handleStartGame}>
            Start Quiz
          </button>
          {session ? (
            <>
              <button className={classes.button} onClick={() => signOut()}>
                Sign Out
              </button>
              <Text className={classes.signedInText}>
                Currently signed in as{" "}
                <span className={classes.userEmail}>{session.user.email}</span>
              </Text>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <button className={classes.button}>
                Sign in to save progress
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default GameStart;
