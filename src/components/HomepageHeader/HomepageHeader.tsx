import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./HomepageHeader.module.css";
import clsx from "clsx";
import Heading from "@theme/Heading";

// Header
export function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
