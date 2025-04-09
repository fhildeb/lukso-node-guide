import { useClientDiversityData } from "@site/src/hooks/useClientDiversityData";
import { useSubstackData } from "@site/src/hooks/useSubstackData";
import styles from "./StatusPanel.module.css";
import { ProgressBar } from "../ProgressBar/ProgressBar";

// Status Panel showing client distribution and latest blogpost
export function StatusPanel() {
  // Client Diversity Data Hook
  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useClientDiversityData();

  // Blog Post Hook
  const {
    loading: blogLoading,
    error: blogError,
    data: blogData,
  } = useSubstackData();

  // Fallback if client data is loading or missing
  const fallbackExecutionClients = [
    { label: "Prysm", value: 0 },
    { label: "Lighthouse", value: 0 },
    { label: "Teku", value: 0 },
    { label: "Others", value: 0 },
  ];
  const fallbackConsensusClients = [
    { label: "Geth", value: 0 },
    { label: "Erigon", value: 0 },
    { label: "Besu", value: 0 },
    { label: "Others", value: 0 },
  ];

  const executionClientsToUse =
    !clientLoading && !clientError && clientData.executionClients.length > 0
      ? clientData.executionClients
      : fallbackExecutionClients;
  const consensusClientsToUse =
    !clientLoading && !clientError && clientData.consensusClients.length > 0
      ? clientData.consensusClients
      : fallbackConsensusClients;

  // Network Status Message
  let networkStatusMessage = "";
  if (clientLoading) {
    networkStatusMessage = "Loading client distribution data from ";
  } else if (clientError) {
    networkStatusMessage = "Could not fetch client distribution data from ";
  } else {
    networkStatusMessage = "Retrieved from ";
  }

  // Blog Status Message
  let blogStatusMessage = "";
  if (blogLoading) {
    blogStatusMessage = "Loading latest blog data from ";
  } else if (blogError) {
    blogStatusMessage = "Could not fetch latest blog data from ";
  } else {
    blogStatusMessage = "Retrieved from ";
  }

  return (
    <div className={styles.statusContainer}>
      {/* Left Panel: Network Distribution */}
      <div className={styles.leftPanel}>
        <h3 className={styles.sectionHeading}>Current Client Distribution</h3>
        <div className={styles.progressPanel}>
          <div className={styles.statusColumn}>
            {executionClientsToUse.map((client, idx) => (
              <ProgressBar
                key={`${client.label}-${client.value}`}
                label={client.label}
                targetPercentage={client.value}
              />
            ))}
          </div>
          <div className={styles.statusColumn}>
            {consensusClientsToUse.map((client, idx) => (
              <ProgressBar
                key={`${client.label}-${client.value}`}
                label={client.label}
                targetPercentage={client.value}
              />
            ))}
          </div>
        </div>
        <div className={styles.statusMessage}>
          {networkStatusMessage}
          <a
            href="https://clientdiversity.lukso.network/"
            target="_blank"
            rel="noreferrer"
          >
            clientdiversity.lukso.network
          </a>
        </div>
      </div>

      {/* Right Panel: Latest News */}
      <div className={styles.rightPanel}>
        <h3 className={styles.sectionHeading}>Latest News</h3>
        <div className={styles.blogContainer}>
          <div className={styles.blogPost}>
            {!blogLoading && !blogError && blogData && blogData.length > 0
              ? blogData.map((blog) => (
                  <>
                    <h2 className={styles.blogTitle}>
                      <span className={styles.blogDate}> {blog.date}: </span>

                      <a href={blog.link} target="_blank" rel="noreferrer">
                        {blog.title}
                      </a>
                    </h2>
                  </>
                ))
              : null}
          </div>
        </div>
        <div className={styles.statusMessage}>
          {blogStatusMessage}
          <a
            href="https://luksovalidators.substack.com/archive"
            target="_blank"
            rel="noreferrer"
          >
            luksovalidators.substack.com
          </a>
        </div>
      </div>
    </div>
  );
}
