import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { getStats } from "../utils/firebase";

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((data) => {
      console.log("Filter", data.filter((q) => q.correct).length);
      setStats(data);
    });
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        maxWidth: 600,
        display: "flex",
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        fontWeight: 700,
      }}
    >
      {stats ? (
        <>
          <h1 style={{ marginBottom: 8 }}>Stats</h1>
          <div className="stat-container">
            <span>
              Easy correct:{" "}
              {stats.filter((q) => q.correct && q.difficulty === "easy").length}{" "}
              / {stats.filter((q) => q.difficulty === "easy").length}{" "}
              <span style={{ color: "gray", marginLeft: 4 }}>
                {stats.filter((q) => q.correct && q.difficulty === "easy")
                  .length
                  ? `(${
                      Math.floor(
                        stats.filter(
                          (q) => q.correct && q.difficulty === "easy"
                        ).length /
                          stats.filter((q) => q.difficulty === "easy").length
                      ) * 100
                    }%)`
                  : "(0%)"}
              </span>
            </span>
            <PieChart
              data={[
                {
                  title: "Correct",
                  value: stats.filter(
                    (q) => q.correct && q.difficulty === "easy"
                  ).length,
                  color: "green",
                },
              ]}
              totalValue={stats.filter((q) => q.difficulty === "easy").length}
              background="red"
              animate
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          <div className="stat-container">
            <span>
              Medium correct:{" "}
              {
                stats.filter((q) => q.correct && q.difficulty === "medium")
                  .length
              }
              / {stats.filter((q) => q.difficulty === "medium").length}
              <span style={{ color: "gray", marginLeft: 4 }}>
                {stats.filter((q) => q.correct && q.difficulty === "medium")
                  .length
                  ? `(${
                      Math.floor(
                        stats.filter(
                          (q) => q.correct && q.difficulty === "medium"
                        ).length /
                          stats.filter((q) => q.difficulty === "medium").length
                      ) * 100
                    }%)`
                  : "(0%)"}
              </span>
            </span>
            <PieChart
              data={[
                {
                  title: "Correct",
                  value: stats.filter(
                    (q) => q.correct && q.difficulty === "medium"
                  ).length,
                  color: "green",
                },
              ]}
              totalValue={stats.filter((q) => q.difficulty === "medium").length}
              background="red"
              animate
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          <div className="stat-container">
            <span>
              Hard correct:{" "}
              {stats.filter((q) => q.correct && q.difficulty === "hard").length}{" "}
              / {stats.filter((q) => q.difficulty === "hard").length}
              <span style={{ color: "gray", marginLeft: 4 }}>
                {stats.filter((q) => q.correct && q.difficulty === "hard")
                  .length
                  ? `(${
                      Math.floor(
                        stats.filter(
                          (q) => q.correct && q.difficulty === "hard"
                        ).length /
                          stats.filter((q) => q.difficulty === "hard").length
                      ) * 100
                    }%)`
                  : "(0%)"}
              </span>
            </span>
            <PieChart
              data={[
                {
                  title: "Correct",
                  value: stats.filter(
                    (q) => q.correct && q.difficulty === "hard"
                  ).length,
                  color: "green",
                },
              ]}
              totalValue={stats.filter((q) => q.difficulty === "hard").length}
              background="red"
              animate
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          <div className="stat-container">
            <span>
              {`Total correct: ${stats.filter((q) => q.correct).length} /
                    ${stats.length}`}
              <span style={{ color: "gray", marginLeft: 4 }}>
                {stats.filter((q) => q.correct).length
                  ? `(${Math.floor(
                      (stats.filter((q) => q.correct).length / stats.length) *
                        100
                    )}%)`
                  : "(0%)"}
              </span>
            </span>
            <PieChart
              data={[
                {
                  title: "Correct",
                  value: stats.filter((q) => q.correct).length / stats.length,
                  color: "green",
                },
              ]}
              totalValue={stats.filter((q) => q.correct).length}
              background="red"
              animate
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          <div className="stat-container">
            <span>{`Questions answered: ${stats.length}`}</span>
            <PieChart
              data={[
                {
                  title: "Easy",
                  value: stats.filter((q) => q.difficulty === "easy").length,
                  color: "green",
                },
                {
                  title: "Medium",
                  value: stats.filter((q) => q.difficulty === "medium").length,
                  color: "yellow",
                },
                {
                  title: "Hard",
                  value: stats.filter((q) => q.difficulty === "hard").length,
                  color: "red",
                },
              ]}
              totalValue={stats.length}
              background="red"
              animate
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
