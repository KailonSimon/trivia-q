import { useAppSelector } from "../../services/hooks";
import { useGetNumberOfQuestionsQuery } from "../../services/questions";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Game from "../../components/Game/Game";
import GameOver from "../../components/GameOver/GameOver";
import GameStart from "../../components/GameStart/GameStart";
import { AnimatePresence } from "framer-motion";
import { useStyles } from "./styles";

function GameContainer() {
  const { classes } = useStyles();

  const { gameCondition, currentQuestion } = useAppSelector(
    (state) => state.game
  );

  const { data, error, isLoading, isFetching, refetch } =
    useGetNumberOfQuestionsQuery(10, {});

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }
  return (
    <div className={classes.container}>
      <AnimatePresence>
        {(() => {
          switch (gameCondition) {
            case 0:
              return <GameStart refetch={refetch} />;
            case 1:
              return (
                <Game
                  isLoading={isLoading}
                  isFetching={isFetching}
                  questions={data.results}
                />
              );
            case 2:
              return <GameOver refetch={refetch} />;
            default:
              return null;
          }
        })()}
      </AnimatePresence>
    </div>
  );
}

export default GameContainer;
