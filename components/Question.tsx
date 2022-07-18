import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import he from "he";
import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  questionWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "fit-content",
    width: "100%",
    maxWidth: 600,
    textAlign: "center",
    padding: "1rem",
    borderRadius: 16,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
  },
  questionCategory: {
    marginBottom: 8,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
    }`,
    letterSpacing: 1,
    fontFamily: "Righteous",
  },
  questionText: {
    marginBottom: "2rem",
    maxWidth: "100%",
    overflowWrap: "break-word",
    fontSize: "1.25rem",
    fontWeight: 700,
    [theme.fn.smallerThan("md")]: {
      marginBottom: "1rem",
    },
  },
  answerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  answerButton: {
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
  correctAnswerButton: {
    backgroundColor: "green",
    border: "none",
    color: "white",
  },
  incorrectAnswerButton: {
    backgroundColor: "red",
    border: "none",
    color: "white",
  },
}));

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
