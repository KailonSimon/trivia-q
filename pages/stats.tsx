import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { Question } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createStyles, Title, Text } from "@mantine/core";
import Metrics from "../components/Stats/Metrics";
import { Bolt, Checks } from "tabler-icons-react";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    minHeight: "calc(100vh - 160px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    color: theme.colors.green[7],
  },
  chartWrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: 600,
    maxWidth: "100%",
  },
}));

const getCorrectAnswers = (answers: Question[]) => {
  return answers.filter(
    (answer: Question) => answer.selectedAnswer === answer.correctAnswer
  );
};

export type Metric = {
  description: string;
  value: number;
  icon: JSX.Element;
};

const getMetrics = (data: Question[]): Metric[] => {
  return [
    {
      description: "Questions Answered",
      value: data.length,
      icon: <Bolt strokeWidth={2} />,
    },
    {
      description: "Correct Answers",
      value: getCorrectAnswers(data).length,
      icon: <Checks strokeWidth={2} />,
    },
  ];
};

export default function Stats({ data }) {
  const { classes } = useStyles();
  const { data: session, status } = useSession();

  let userData: Question[];

  if (status === "authenticated") {
    userData = data.filter(
      (answer: Question) => answer.userId === session.user.id
    );
  }

  return (
    <>
      <Head>
        <title>Trivia Q | Stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={classes.container}>
        <Title order={1} mb={8}>
          Stats
        </Title>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {data.length && (
            <Metrics title="Total Metrics" metrics={getMetrics(data)} />
          )}
          {userData && userData.length && (
            <Metrics title="Your Metrics" metrics={getMetrics(userData)} />
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await prisma.question.findMany({
    select: {
      id: true,
      question: true,
      type: true,
      difficulty: true,
      category: true,
      incorrectAnswers: true,
      correctAnswer: true,
      selectedAnswer: true,
      userId: true,
    },
  });

  return {
    props: {
      data,
    },
  };
};
