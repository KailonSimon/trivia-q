import React from "react";
import { createStyles, Text } from "@mantine/core";
import { Metric } from "../../pages/stats";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 16,
    height: "20vh",
    minHeight: 150,
    aspectRatio: "1/1",
    background: "#37b24d",
    color: theme.white,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  metricValue: {
    fontSize: "2rem",
  },
  icon: {
    height: "min-content",
  },
}));

type Props = {
  metric: Metric;
};

function MetricsCard({ metric }: Props) {
  const { classes } = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.metricValue}>
          <Text inherit>{metric.value}</Text>
        </div>
        <div className={classes.icon}>{metric.icon}</div>
      </div>
      <div>
        <Text>{metric.description}</Text>
      </div>
    </div>
  );
}

export default MetricsCard;
