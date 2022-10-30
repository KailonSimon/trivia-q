import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "tabler-icons-react";
import Question from "./Question";
import { useSession } from "next-auth/react";
import { ActionIcon, createStyles, Progress, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import {
  incrementScore,
  resetAnswer,
  setAnswer,
  advanceQuestion,
  endGame,
} from "../services/redux/gameSlice";
import { useModals } from "@mantine/modals";
import LoadingScreen from "./LoadingScreen";
import { sendAnswerRequest } from "../lib/utils";

const useStyles = createStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    height: "100%",
    minHeight: "fit-content",
    maxWidth: "100vw",
    overflow: "hidden",
    padding: "1rem",
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
    background: "#E03131",
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
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    position: "relative",
    fontWeight: 700,
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
  modal: {
    borderRadius: 16,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
  },
}));

export default function Game({ questions, isLoading, isFetching }) {
  const { classes } = useStyles();
  const modals = useModals();
  const { score, selectedAnswer, currentQuestion } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: "Exit Quiz?",
      centered: true,
      children: <Text size="sm">Your progress will be lost.</Text>,
      labels: { confirm: "Exit", cancel: "Cancel" },
      classNames: { modal: classes.modal },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => dispatch(endGame()),
    });

  const selectAnswer = (answer: string) => {
    dispatch(setAnswer(answer));

    try {
      const body = {
        question: questions[currentQuestion],
        answer,
        ...(session && { uid: session.user.id }),
      };
      sendAnswerRequest(body);
    } catch (error) {
      console.error(error);
    }

    if (answer === questions[currentQuestion].correct_answer) {
      dispatch(incrementScore());
    } else {
      return;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch(resetAnswer());
      dispatch(advanceQuestion());
    }
  };

  const endQuiz = () => {
    dispatch(endGame());
  };

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className={classes.content}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <div className={classes.scoreboard}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <ActionIcon
            size="md"
            color="red"
            variant="outline"
            onClick={openConfirmModal}
          >
            <X />
          </ActionIcon>
          <Text weight="bold">
            Question: {currentQuestion + 1}/{questions.length}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            className={`${classes.difficultyBadge}`}
            style={{
              background:
                questions[currentQuestion].difficulty === "easy"
                  ? "green"
                  : questions[currentQuestion].difficulty === "medium"
                  ? "orange"
                  : "#E03131",
            }}
          >
            <Text weight="bold">
              {questions[currentQuestion].difficulty.toUpperCase()}
            </Text>
          </div>
          <Text weight="bold">
            Score: {score ? score : "-"} /{" "}
            {selectedAnswer ? currentQuestion + 1 : currentQuestion}
          </Text>
        </div>
        <Progress
          styles={{
            root: { position: "absolute", bottom: 0, width: "100%" },
          }}
          value={
            selectedAnswer
              ? ((currentQuestion + 1) * 100) / questions.length
              : (currentQuestion * 100) / questions.length
          }
          color="green"
          animate={!!selectedAnswer}
        />
      </div>

      <AnimatePresence>
        <Question
          data={questions[currentQuestion]}
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
                currentQuestion + 1 === questions.length
                  ? endQuiz
                  : nextQuestion
              }
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              disabled={!selectedAnswer}
            >
              {currentQuestion + 1 === questions.length ? (
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
    </motion.div>
  );
}
