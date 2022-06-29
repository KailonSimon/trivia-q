import { motion } from "framer-motion";

export default function ProgressBar({ value }) {
  return (
    <div id="progress-bar">
      <motion.div
        id="progress-bar-value"
        style={{}}
        animate={{ width: `${value}%` }}
      />
    </div>
  );
}
