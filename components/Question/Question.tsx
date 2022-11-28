import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import he from "he";
import { Text } from "@mantine/core";
import { useStyles } from "./styles";

function Question({ data, selectAnswer, selectedAnswer }) {
  const { classes } = useStyles();
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
      className={classes.questionWrapper}
      key={data.question}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <Text className={classes.questionCategory}>{data.category}</Text>
      <Text className={classes.questionText}>{he.decode(data.question)}</Text>
      <div className={classes.answerContainer}>
        {answers.map((answer, i) => (
          <motion.button
            className={`${classes.answerButton} ${
              selectedAnswer
                ? answer === data.correct_answer
                  ? classes.correctAnswerButton
                  : classes.incorrectAnswerButton
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
            <Text>{he.decode(answer)}</Text>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default Question;
