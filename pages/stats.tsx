import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import Head from "next/head";
import StatsContainer from "../components/StatsContainer/StatsContainer";

export type Metric = {
  description: string;
  value: number;
  icon: JSX.Element;
};

export default function Stats({ data }) {
  return (
    <>
      <Head>
        <title>Trivia Q | Stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <StatsContainer data={data} />
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
