import { createStyles, Title } from "@mantine/core";
import { useAppDispatch } from "../services/hooks";
import { exitGame, restartGame } from "../services/redux/gameSlice";
import { motion } from "framer-motion";

const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    color: theme.colorScheme === "dark" ? theme.colors.green[7] : theme.black,
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
    fontWeight: 700,
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
  options: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing.md,
    width: "100%",
    maxWidth: 300,
  },
}));

function GameOver({ refetch }) {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const handleRestartGame = () => {
    refetch();
    dispatch(restartGame());
  };

  return (
    <motion.div
      className={classes.content}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <div className={classes.container}>
        <Title order={2} className={classes.title}>
          Game Over!
        </Title>
        <div className={classes.options}>
          <button className={classes.button} onClick={handleRestartGame}>
            Start New Quiz
          </button>
          <button
            className={classes.button}
            onClick={() => dispatch(exitGame())}
          >
            Return to Main Menu
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default GameOver;
