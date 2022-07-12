import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import he from "he";

function Question({ data, selectAnswer, selectedAnswer }) {
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      if (data.type === "multiple") {
        setAnswers(shuffle([...data.incorrect_answers, data.correct_answer]));
      } else {
        setAnswers(["True", "False"]);
      }
    }
  }, [data]);
  return (
    <motion.div
      id="question-container"
      key={data.question}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <p
        className="question-category"
        style={{
          marginBottom: 8,
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        {data.category}
      </p>
      <h2 id="question">{he.decode(data.question)}</h2>
      <div id="answer-button-container">
        {answers.map((answer, i) => (
          <motion.button
            className={`answer-button ${
              selectedAnswer
                ? answer === data.correct_answer
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
                ? answer === data.correct_answer || answer === selectedAnswer
                  ? 1
                  : 0
                : 1,
              y: selectedAnswer
                ? answer === data.correct_answer || answer === selectedAnswer
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
    </motion.div>
  );
}

export default Question;
