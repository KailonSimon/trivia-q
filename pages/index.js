import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { ArrowRight } from "tabler-icons-react";
import Modal from "../components/Modal";
const he = require("he");

export default function Home() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [buttonTranslate, setButtonTranslate] = useState(-50);
  const { isLoading, error, data, refetch } = useQuery(
    "questions",
    () =>
      fetch("https://opentdb.com/api.php?amount=1").then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) {
      if (data.results[0].type === "multiple") {
        setAnswers(
          shuffle([
            ...data.results[0].incorrect_answers,
            data.results[0].correct_answer,
          ])
        );
      } else {
        setAnswers(["True", "False"]);
      }
    }
  }, [data]);

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === data.results[0].correct_answer) {
      setScore(score + 1);
    } else {
      return;
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    refetch();
  };

  return (
    <>
      <Head>
        <title>Trivia-Q | Quiz Game Built With React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>An error has occurred: {error.message}</h1>
        ) : (
          <>
            <div id="scoreboard">
              <h2>Score: {score}</h2>
              <span
                className={`difficulty-badge ${data.results[0].difficulty}`}
              >
                <p>{data.results[0].difficulty.toUpperCase()}</p>
              </span>
            </div>
            <div id="question-container">
              <h2 id="question">{he.decode(data.results[0].question)}</h2>
              <div id="answer-button-container">
                {answers.map((answer, i) => (
                  <motion.button
                    className={`answer-button ${
                      selectedAnswer
                        ? answer === data.results[0].correct_answer
                          ? "correct"
                          : "incorrect"
                        : null
                    }`}
                    key={i}
                    onClick={() => selectAnswer(answer)}
                    disabled={selectedAnswer}
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity: selectedAnswer
                        ? answer === data.results[0].correct_answer ||
                          answer === selectedAnswer
                          ? 1
                          : 0
                        : 1,
                      y: selectedAnswer
                        ? answer === data.results[0].correct_answer ||
                          answer === selectedAnswer
                          ? 0
                          : 25
                        : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {he.decode(answer)}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.button
              id="next-button"
              onClick={nextQuestion}
              initial={false}
              animate={{
                opacity: selectedAnswer ? 1 : 0,
                x: selectedAnswer ? 0 : buttonTranslate,
              }}
              transition={{ ease: "anticipate" }}
            >
              <span>Next Question</span>
              <ArrowRight size={24} strokeWidth={3} />
            </motion.button>
          </>
        )}
      </>
    </>
  );
}
