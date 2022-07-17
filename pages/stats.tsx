import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { Question } from "@prisma/client";
import {
  Pie,
  PieChart,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { createStyles, Title, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    minHeight: "calc(100vh - 160px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0",
  },
  chartWrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: 600,
    maxWidth: "100%",
  },
}));

const colors = ["#008000", "#FF0000"];

const getCorrectAnswers = (answers: Question[]) => {
  return answers.filter(
    (answer: Question) => answer.selectedAnswer === answer.correctAnswer
  );
};

const getIncorrectAnswers = (answers: Question[]) => {
  return answers.filter(
    (answer: Question) => answer.selectedAnswer !== answer.correctAnswer
  );
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

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  return (
    <div className={classes.container}>
      <Title order={1} mb={8}>
        Stats
      </Title>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
      >
        {userData && (
          <div className={classes.chartWrapper}>
            <Text weight={700}>You</Text>
            {userData.length ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Correct",
                        value: getCorrectAnswers(userData).length,
                      },
                      {
                        name: "Incorrect",
                        value: getIncorrectAnswers(userData).length,
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    fill="red"
                  >
                    {data.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      backgroundColor: "#191919",
                      border: "1px solid #cdbe78",
                    }}
                    itemStyle={{ color: "#f2f2f2" }}
                    formatter={(value, name, props) =>
                      `${((value / data.length) * 100).toFixed(2)}%`
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Text style={{ marginTop: 4 }}>No user data.</Text>
            )}
          </div>
        )}

        <div className={classes.chartWrapper}>
          <Text weight={700}>Average</Text>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "Correct", value: getCorrectAnswers(data).length },
                  {
                    name: "Incorrect",
                    value: getIncorrectAnswers(data).length,
                  },
                ]}
                dataKey="value"
                nameKey="name"
                fill="red"
              >
                {data.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  backgroundColor: "#191919",
                  border: "1px solid #cdbe78",
                }}
                itemStyle={{ color: "#f2f2f2" }}
                formatter={(value, name, props) =>
                  `${((value / data.length) * 100).toFixed(2)}%`
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
