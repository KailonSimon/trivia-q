import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { getStats } from "../utils/firebase";

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((data) => {
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
    ></div>
  );
}
