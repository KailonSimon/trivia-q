import { Title } from "@mantine/core";
import { useAppDispatch } from "../../services/hooks";
import { exitGame, restartGame } from "../../services/redux/gameSlice";
import { motion } from "framer-motion";
import { useStyles } from "./styles";

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
