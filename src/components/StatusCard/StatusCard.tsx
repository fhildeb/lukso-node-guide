import React from "react";
import styles from "./StatusCard.module.css";
import software from "@site/src/consts/software";

export function StatusCard() {
  return (
    <div className={styles.card}>
      <div>
        This guide was last updated and tested on October 21, 2025 using the
        following software:
      </div>
      {Object.entries(software).map(([category, tools]) => (
        <div key={category} className={styles.categorySection}>
          <h4 className={styles.categoryHeading}>{category}</h4>
          <div className={styles.softwareList}>
            {tools.map((tool) => (
              <button
                key={tool.name}
                className={styles.softwareButton}
                onClick={() => window.open(tool.link, "_blank")}
              >
                <span className={styles.toolInfo}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <code className={styles.version}>{tool.version}</code>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
