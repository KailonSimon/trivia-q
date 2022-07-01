import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { ArrowRight, Check } from "tabler-icons-react";
import useSound from "use-sound";
import { ThreeDots } from "react-loader-spinner";
import ProgressBar from "./ProgressBar";
import Question from "./Question";

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
      const body = { question: data.results[currentQuestion], answer };
      fetch("/api/question", {
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
            <div style={{ fontWeight: 700 }}>
              <p>
                Score: {score ? score : "-"} /{" "}
                {selectedAnswer ? currentQuestion + 1 : currentQuestion}
              </p>
              <p>
                Question: {currentQuestion + 1}/{numberOfQuestions}
              </p>
            </div>
            <span
              className={`difficulty-badge ${data.results[currentQuestion].difficulty}`}
            >
              <p>{data.results[currentQuestion].difficulty.toUpperCase()}</p>
            </span>
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
