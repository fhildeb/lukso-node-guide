import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  label: string;
  targetPercentage: number;
};

// Interactive Progress Bar
export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  targetPercentage,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  // Coloring
  const progressColor =
    targetPercentage > 50
      ? "#6b8e9e"
      : targetPercentage < 33
      ? "#a7c6d3"
      : "#7c9ead";

  return (
    <div className={styles.progressWrapper}>
      <div
        className={styles.progressFill}
        style={{ width: `${progress}%`, backgroundColor: progressColor }}
      ></div>
      <span className={styles.progressText}>
        {label} {progress}%
      </span>
    </div>
  );
};
