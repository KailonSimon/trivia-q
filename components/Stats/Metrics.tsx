import { useEffect, useState, useCallback } from "react";
import { createStyles } from "@mantine/core";
import MetricsCard from "./MetricsCard";
import useEmblaCarousel from "embla-carousel-react";
import { Bolt, Book2, Checks, Icon } from "tabler-icons-react";
import { Metric } from "../../pages/stats";

const useStyles = createStyles((theme) => ({
  embla: {
    position: "relative",
    padding: 20,
    width: "100%",
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRadius: 16,
    filter: theme.colorScheme === "dark" ? "" : "drop-shadow(0 4px 4px gray)",
  },
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: "1rem",
  },
}));

/*const metrics = [
  {
    description: "Stat 1",
    value: 1,
    icon: <Bolt strokeWidth={2} />,
  },
  {
    description: "Stat 2",
    value: 133,
    icon: <Checks strokeWidth={2} />,
  },
  {
    description: "Stat 3",
    value: 134,
    icon: <Book2 strokeWidth={2} />,
  },
];*/

type Props = {
  title: string;
  metrics: Metric[];
};

export default function Metrics({ title, metrics }: Props) {
  const { classes } = useStyles();
  const [viewportRef, embla] = useEmblaCarousel({ loop: false });

  return (
    <div className={classes.embla}>
      <h2 className={classes.title}>{title}</h2>
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {metrics.map((metric: Metric) => (
            <div className="embla__slide" key={metric.description}>
              <div className="embla__slide__inner">
                <MetricsCard metric={metric} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
