import MetricsCard from "../MetricsCard/MetricsCard";
import useEmblaCarousel from "embla-carousel-react";
import { Metric } from "../../../pages/stats";
import { useStyles } from "./styles";

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
