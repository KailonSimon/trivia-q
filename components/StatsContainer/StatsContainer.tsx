import { Question } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Title } from "@mantine/core";
import Metrics from "../Stats/Metrics/Metrics";
import { Bolt, Checks } from "tabler-icons-react";
import { useStyles } from "./styles";
import { Metric } from "../../pages/stats";

const getCorrectAnswers = (answers: Question[]) => {
  return answers.filter(
    (answer: Question) => answer.selectedAnswer === answer.correctAnswer
  );
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

function StatsContainer({ data }) {
  const { classes } = useStyles();
  const { data: session, status } = useSession();

  let userData: Question[];

  if (status === "authenticated") {
    userData = data.filter(
      (answer: Question) => answer.userId === session.user.id
    );
  }
  return (
    <div className={classes.container}>
      <Title order={1} mb={8}>
        Stats
      </Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
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
  );
}

export default StatsContainer;
