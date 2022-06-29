import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { ArrowRight, Check } from "tabler-icons-react";
import useSound from "use-sound";
import { ThreeDots } from "react-loader-spinner";
import ProgressBar from "./ProgressBar";
import Question from "./Question";

export default function Game({ numberOfQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [buttonTranslate, setButtonTranslate] = useState(-50);
  const [playCorrect] = useSound("sounds/correct.mp3");
  const [playIncorrect] = useSound("sounds/incorrect.mp3");
  const router = useRouter();

  const { isLoading, error, data, refetch } = useQuery(
    "questions",
    () =>
      fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`).then(
        (res) => res.json()
      ),
    { refetchOnWindowFocus: false }
  );

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === data.results[currentQuestion].correct_answer) {
      playCorrect();
      setScore(score + 1);
    } else {
      playIncorrect();
      return;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < numberOfQuestions - 1) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <ThreeDots color="black" />
      ) : error ? (
        <h1>An error has occurred: {error.message}</h1>
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
                      ? () => router.push("/")
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
