import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "tabler-icons-react";
import Question from "../Question/Question";
import { useSession } from "next-auth/react";
import { ActionIcon, Progress, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  incrementScore,
  resetAnswer,
  setAnswer,
  advanceQuestion,
  endGame,
} from "../../services/redux/gameSlice";
import { useModals } from "@mantine/modals";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { sendAnswerRequest } from "../../lib/utils";
import { useStyles } from "./styles";

function getQuestionValue(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
  }
}

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
      onConfirm: () => dispatch(endGame()),
    });

  const selectAnswer = (answer: string) => {
    dispatch(setAnswer(answer));

    try {
      const body = {
        question: questions[currentQuestion],
        answer,
        ...(session && {
          uid: session.user.id,
          updateData:
            answer === questions[currentQuestion].correct_answer
              ? {
                  XP: {
                    increment: getQuestionValue(
                      questions[currentQuestion].difficulty
                    ),
                  },
                }
              : null,
        }),
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
