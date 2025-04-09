import sections from "@site/src/consts/sections";
import styles from "./PageRegistry.module.css";
import { SectionGrid } from "../SectionGrid/SectionGrid";

/**
 * Landing page layout in 3 main columns and 1/5-sized cards
 *
 * - Left: Guide Masonry in 3 subsections
 * - Center: Theory Section
 * - Right column: Archives and Templates
 */
export function PageRegistry() {
  const guidesSection = sections.find((s) => s.name.toLowerCase() === "guides");
  const theorySection = sections.find((s) => s.name.toLowerCase() === "theory");
  const archiveSection = sections.find(
    (s) => s.name.toLowerCase() === "archive"
  );
  const templatesSection = sections.find(
    (s) => s.name.toLowerCase() === "templates"
  );

  return (
    <div className={styles.landingGrid}>
      <div className={styles.leftColumn}>
        {guidesSection && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {guidesSection.emoji && (
                <span className={styles.emoji}>{guidesSection.emoji} </span>
              )}
              {guidesSection.name}
            </h2>
            <SectionGrid
              chapters={guidesSection.chapters}
              gridClass={styles.guidesGrid}
              sectionName={guidesSection.name}
            />
          </div>
        )}
      </div>
      <div className={styles.centerColumn}>
        {theorySection && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {theorySection.emoji && (
                <span className={styles.emoji}>{theorySection.emoji} </span>
              )}
              {theorySection.name}
            </h2>
            <SectionGrid
              chapters={theorySection.chapters}
              gridClass={styles.theoryGrid}
              sectionName={theorySection.name}
            />
          </div>
        )}
      </div>
      <div className={styles.rightColumn}>
        {archiveSection && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {archiveSection.emoji && (
                <span className={styles.emoji}>{archiveSection.emoji} </span>
              )}
              {archiveSection.name}
            </h2>
            <SectionGrid
              chapters={archiveSection.chapters}
              gridClass={styles.singleGrid}
              sectionName={archiveSection.name}
            />
          </div>
        )}
        {templatesSection && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {templatesSection.emoji && (
                <span className={styles.emoji}>{templatesSection.emoji} </span>
              )}
              {templatesSection.name}
            </h2>
            <SectionGrid
              chapters={templatesSection.chapters}
              gridClass={styles.singleGrid}
              sectionName={templatesSection.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
