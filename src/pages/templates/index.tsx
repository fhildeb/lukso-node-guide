import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./templates.module.css";
import dashboards from "@site/src/consts/templates";

function TemplatesPage() {
  const categorized = {
    "📝 Prysm & Lighthouse Dashboards": dashboards.filter(
      (d) => d.label === "Prysm & Lighthouse"
    ),
    "📝 Teku & Nimbus-Eth2 Dashboards": dashboards.filter(
      (d) => d.label === "Teku & Nimbus-Eth2"
    ),
  };

  const handleDownload = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/templates/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout
      title="Grafana Templates"
      description="Prebuilt Grafana dashboards for Ethereum clients."
    >
      <div className={styles.containerWrapper}>
        <div className={styles.pageContainer}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={styles.sectionBox}>
              <div className="admonition admonition-tip alert alert--success">
                <div className="admonition-heading">
                  <h2>Modifications</h2>
                </div>
                <div className="admonition-content">
                  <p>
                    If you chose different <strong>Ports</strong> or{" "}
                    <strong>Jobs</strong>, you will have to modify and match all
                    configuration files.
                  </p>
                  <ol>
                    <li>
                      <Link to="/docs/guides/monitoring/port-configuration">
                        Consensus Client Ports
                      </Link>{" "}
                      can be adjusted within the{" "}
                      <Link to="/docs/guides/monitoring/prometheus#3-dataset-configuration">
                        Prometheus Dataset
                      </Link>
                      .
                    </li>
                    <li>
                      Price Conversions require updating the{" "}
                      <Link to="/docs/guides/monitoring/json-exporter#3-price-configuration">
                        JSON Exporter
                      </Link>{" "}
                      and{" "}
                      <Link to="/docs/guides/monitoring/prometheus#3-dataset-configuration">
                        Prometheus Dataset
                      </Link>
                      .
                    </li>
                    <li>
                      Job Names of the{" "}
                      <Link to="/docs/guides/monitoring/prometheus#3-dataset-configuration">
                        Prometheus Dataset
                      </Link>{" "}
                      must match the Jobs in the{" "}
                      <Link to="/templates">Grafana Dashboard</Link>.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className={styles.sectionBox}>
              <div className="admonition admonition-tip alert alert--success">
                <div className="admonition-heading">
                  <h2>Preview</h2>
                  <img src="/img/guides/monitoring/dashboard.jpeg"></img>
                </div>
              </div>
            </div>
            <div className={`${styles.sectionBox} ${styles.conditionalRight}`}>
              <div className="admonition admonition-info alert alert--info">
                <div className="infoBlock">
                  <h2>Default Jobs</h2>
                  <ul>
                    <li>
                      <strong>Prometheus Service</strong>: <br />
                      <code>prometheus-job</code>
                    </li>
                    <li>
                      <strong>Separate Consensus Client</strong>: <br />
                      <code>consensus-client-job</code>
                    </li>
                    <li>
                      <strong>Separate Validator Client</strong>: <br />
                      <code>validator-client-job</code>
                    </li>
                    <li>
                      <strong>Blackbox Exporters</strong>: <br />
                      <code>cloudflare-ping-job</code> <br />
                      <code>google-ping-job</code>
                    </li>
                    <li>
                      <strong>Combined Beacon Client</strong>: <br />
                      <code>beacon-client-job</code>
                    </li>
                    <li>
                      <strong>Node Exporter</strong>: <br />
                      <code>node-exporter-job</code>
                    </li>

                    <li>
                      <strong>JSON Exporter</strong>: <br />
                      <code>json-exporter-job</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`${styles.sectionBox} ${styles.conditionalRight}`}>
              <div className="admonition admonition-info alert alert--info">
                <div className="infoBlock">
                  <h2>Default Ports</h2>
                  <ul>
                    <li>
                      <strong>Consensus Interfaces</strong>: <br />{" "}
                      <code>5054: Lighthouse</code> <br />
                      <code>8080: Prysm</code>
                    </li>
                    <li>
                      <strong>Validator Interfaces</strong>: <br />{" "}
                      <code>5057: Lighthouse</code> <br />
                      <code>8081: Prysm</code>
                    </li>
                    <li>
                      <strong>Combined Interfaces</strong>: <br />{" "}
                      <code>8008: Nimbus-Eth2</code>
                      <br />
                      <code>8009: Teku</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className={styles.centerColumn}>
            {Object.entries(categorized).map(([category, items]) => (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryHeading}>{category}</h2>
                <div className={styles.dashboardList}>
                  {items
                    .sort((a, b) =>
                      b.grafana.localeCompare(a.grafana, undefined, {
                        numeric: true,
                      })
                    )
                    .map((item) => (
                      <button
                        key={item.filename}
                        className={styles.softwareButton}
                      >
                        <span className={styles.toolInfo}>
                          <span className={styles.toolName}>
                            Grafana {item.grafana} {item.currency} LUKSO
                            Template
                          </span>
                          <div className={styles.inlineCodes}>
                            <code
                              className={`${styles.version} ${styles.action}`}
                              onClick={() =>
                                window.open(
                                  `/templates/${item.filename}`,
                                  "_blank"
                                )
                              }
                              title="Open in browser"
                            >
                              🔎 Show
                            </code>
                            <code
                              className={`${styles.version} ${styles.action}`}
                              onClick={() => handleDownload(item.filename)}
                              title="Download JSON file"
                            >
                              📥 Download
                            </code>
                          </div>
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.sectionBox}>
              <div className="admonition admonition-info alert alert--info">
                <div className="infoBlock">
                  <h2>Default Jobs</h2>
                  <ul>
                    <li>
                      <strong>Prometheus Service</strong>: <br />
                      <code>prometheus-job</code>
                    </li>
                    <li>
                      <strong>Separate Consensus Client</strong>: <br />
                      <code>consensus-client-job</code>
                    </li>
                    <li>
                      <strong>Separate Validator Client</strong>: <br />
                      <code>validator-client-job</code>
                    </li>
                    <li>
                      <strong>Blackbox Exporters</strong>: <br />
                      <code>cloudflare-ping-job</code> <br />
                      <code>google-ping-job</code>
                    </li>
                    <li>
                      <strong>Combined Beacon Client</strong>: <br />
                      <code>beacon-client-job</code>
                    </li>
                    <li>
                      <strong>Node Exporter</strong>: <br />
                      <code>node-exporter-job</code>
                    </li>

                    <li>
                      <strong>JSON Exporter</strong>: <br />
                      <code>json-exporter-job</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.sectionBox}>
              <div className="admonition admonition-info alert alert--info">
                <div className="infoBlock">
                  <h2>Default Ports</h2>
                  <ul>
                    <li>
                      <strong>Consensus Interfaces</strong>: <br />{" "}
                      <code>5054: Lighthouse</code> <br />
                      <code>8080: Prysm</code>
                    </li>
                    <li>
                      <strong>Validator Interfaces</strong>: <br />{" "}
                      <code>5057: Lighthouse</code> <br />
                      <code>8081: Prysm</code>
                    </li>
                    <li>
                      <strong>Combined Interfaces</strong>: <br />{" "}
                      <code>8008: Nimbus-Eth2</code>
                      <br />
                      <code>8009: Teku</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TemplatesPage;
