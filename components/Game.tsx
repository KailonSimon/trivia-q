import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "tabler-icons-react";
import { ThreeDots } from "react-loader-spinner";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import { useSession } from "next-auth/react";
import { Text } from "@nextui-org/react";
import { useGetNumberOfQuestionsQuery } from "../services/questions";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import {
  incrementScore,
  resetAnswer,
  setAnswer,
  advanceQuestion,
  resetGame,
} from "../services/redux/gameSlice";
import { useEffect } from "react";

export default function Game({ numberOfQuestions = 10 }) {
  const { score, selectedAnswer, currentQuestion } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

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
    dispatch(resetGame());
    refetch();
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <ThreeDots color="black" />
      ) : error ? (
        <h1>An error has occurred.</h1>
      ) : (
        <>
          <div id="scoreboard">
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
              className={`difficulty-badge ${data.results[currentQuestion].difficulty}`}
            >
              <Text weight="bold">
                {data.results[currentQuestion].difficulty.toUpperCase()}
              </Text>
            </div>
            <ProgressBar
              value={((currentQuestion + 1) / numberOfQuestions) * 100}
            />
          </div>

          <AnimatePresence>
            <Question
              data={data.results[currentQuestion]}
              selectAnswer={selectAnswer}
              selectedAnswer={selectedAnswer}
            />
          </AnimatePresence>

          <div id="next-button-container">
            <AnimatePresence>
              {selectedAnswer && (
                <motion.button
                  id="next-button"
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
        </>
      )}
    </>
  );
}
