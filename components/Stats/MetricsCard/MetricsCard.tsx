import React from "react";
import { Text } from "@mantine/core";
import { Metric } from "../../../pages/stats";
import { useStyles } from "./styles";

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
