import { useEffect, useReducer, useRef } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { ArrowRight, Check } from "tabler-icons-react";
import useSound from "use-sound";
import { ThreeDots } from "react-loader-spinner";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import { useSession } from "next-auth/react";
import { Text } from "@nextui-org/react";

const initialState = { score: 0, selectedAnswer: null, currentQuestion: 0 };

type ACTIONTYPE =
  | { type: "incrementScore" }
  | { type: "setAnswer"; payload: string }
  | { type: "nextQuestion" };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "incrementScore":
      return { ...state, score: state.score + 1 };
    case "setAnswer":
      return { ...state, selectedAnswer: action.payload };
    case "nextQuestion":
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    default:
      throw new Error();
  }
}

export default function Game({ numberOfQuestions }) {
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const { score, selectedAnswer, currentQuestion } = gameState;
  const [playCorrect] = useSound("sounds/correct.mp3");
  const [playIncorrect] = useSound("sounds/incorrect.mp3");
  const router = useRouter();
  const { data: session, status } = useSession();

  const { isLoading, error, data, remove } = useQuery(
    "questions",
    () =>
      fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`).then(
        (res) => res.json()
      ),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );

  const selectAnswer = (answer: string) => {
    dispatch({ type: "setAnswer", payload: answer });

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
      dispatch({ type: "incrementScore" });
    } else {
      return;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < numberOfQuestions - 1) {
      dispatch({ type: "setAnswer", payload: null });
      dispatch({ type: "nextQuestion" });
    }
  };

  const endQuiz = () => {
    remove();
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
