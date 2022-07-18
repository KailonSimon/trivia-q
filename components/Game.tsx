import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, DoorExit, LetterX } from "tabler-icons-react";
import Question from "./Question";
import { useSession } from "next-auth/react";
import { ActionIcon, createStyles, Progress, Text } from "@mantine/core";
import { useGetNumberOfQuestionsQuery } from "../services/questions";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import {
  incrementScore,
  resetAnswer,
  setAnswer,
  advanceQuestion,
  endGame,
} from "../services/redux/gameSlice";
import LoadingScreen from "./LoadingScreen";

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
  scoreboard: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 600,
    padding: "1rem 0",
    marginBottom: "1rem",
  },
  difficultyBadge: {
    border: "1px solid transparent",
    fontSize: "0.75rem",
    height: 32,
    lineHeight: 30,
    padding: "0 1rem",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    textTransform: "uppercase",
    borderRadius: 32,
    fontWeight: 700,
    letterSpacing: 0.25,
    color: theme.white,
  },
  badgeEasy: {
    background: "green",
  },
  badgeMedium: {
    background: "orange",
  },
  badgeHard: {
    background: "red",
  },
  nextButtonContainer: {
    height: 90,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "1rem 0",
  },
  nextButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 25px",
    borderRadius: 32,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    position: "relative",
    fontWeight: 900,
    transition: "all 500ms",
    overflow: "hidden",
    zIndex: 1,
    [theme.fn.largerThan("md")]: {
      "&:hover": {
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
        cursor: "pointer",
      },
    },
  },
  exitButtonContainer: {
    width: "100%",
    maxWidth: 600,
    paddingTop: "1rem",
  },
}));

export default function Game({ numberOfQuestions = 10 }) {
  const { classes } = useStyles();
  const { score, selectedAnswer, currentQuestion } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const { data, error, isLoading, refetch } = useGetNumberOfQuestionsQuery(
    10,
    {}
  );

  const selectAnswer = (answer: string) => {
    dispatch(setAnswer(answer));

    try {
      const body = {
        question: data.results[currentQuestion],
        answer,
        ...(session && { uid: session.user.id }),
      };
      fetch("/api/answers", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }

    if (answer === data.results[currentQuestion].correct_answer) {
      dispatch(incrementScore());
    } else {
      return;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < numberOfQuestions - 1) {
      dispatch(resetAnswer());
      dispatch(advanceQuestion());
    }
  };

  const endQuiz = () => {
    dispatch(endGame());
    refetch();
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <Text>An error has occurred.</Text>
      ) : (
        <div className={classes.content}>
          {/*<div className={classes.exitButtonContainer}>
            <ActionIcon variant="outline" color="red" size="lg">
              <LetterX size={20} />
            </ActionIcon>
      </div>*/}
          <div className={classes.scoreboard}>
            <div>
              <Text weight="bold">
                Score: {score ? score : "-"} /{" "}
                {selectedAnswer ? currentQuestion + 1 : currentQuestion}
              </Text>
              <Text weight="bold">
                Question: {currentQuestion + 1}/{numberOfQuestions}
              </Text>
            </div>
            <div
              className={`${classes.difficultyBadge}`}
              style={{
                background:
                  data.results[currentQuestion].difficulty === "easy"
                    ? "green"
                    : data.results[currentQuestion].difficulty === "medium"
                    ? "orange"
                    : "red",
              }}
            >
              <Text weight="bold">
                {data.results[currentQuestion].difficulty.toUpperCase()}
              </Text>
            </div>
            <Progress
              styles={{
                root: { position: "absolute", bottom: 0, width: "100%" },
              }}
              sections={[
                { value: (score / numberOfQuestions) * 100, color: "green" },
                { value: (currentQuestion - score) * 10, color: "red" },
              ]}
              animate={!!selectedAnswer}
            />
          </div>

          <AnimatePresence>
            <Question
              data={data.results[currentQuestion]}
              selectAnswer={selectAnswer}
              selectedAnswer={selectedAnswer}
            />
          </AnimatePresence>

          <div className={classes.nextButtonContainer}>
            <AnimatePresence>
              {selectedAnswer && (
                <motion.button
                  className={classes.nextButton}
                  onClick={
                    currentQuestion + 1 === numberOfQuestions
                      ? endQuiz
                      : nextQuestion
                  }
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  disabled={!selectedAnswer}
                >
                  {currentQuestion + 1 === numberOfQuestions ? (
                    <>
                      <span>Finish</span>
                      <Check size={24} strokeWidth={3} />
                    </>
                  ) : (
                    <>
                      <span>Next Question</span>
                      <ArrowRight size={24} strokeWidth={3} />
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
