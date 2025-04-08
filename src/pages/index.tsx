import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import sections from "../consts/sections";
import styles from "./index.module.css";

// Helper function for link path creation
function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

// Header
function HomepageHeader() {
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

// Grid to render individual chapters in multi-columns for masonry layout
function SectionGrid({
  chapters,
  gridClass,
  sectionName,
}: {
  chapters: any[];
  gridClass: string;
  sectionName: string;
}) {
  return (
    <div className={gridClass}>
      {chapters.map((chapter, index) => (
        <ChapterCard
          key={index}
          chapter={chapter}
          sectionName={sectionName}
          chapterIndex={index + 1}
        />
      ))}
    </div>
  );
}

// Chapter card to render and structure headings and their pages.
function ChapterCard({
  chapter,
  sectionName,
  chapterIndex,
}: {
  chapter: any;
  sectionName: string;
  chapterIndex: number;
}) {
  return (
    <div className={styles.card}>
      {chapter.title && (
        <h3 className={styles.cardTitle}>
          {sectionName.toLowerCase() === "guides" && `${chapterIndex}. `}
          <Link to={`/docs/${toKebabCase(chapter.title)}`}>
            {chapter.title}
          </Link>
        </h3>
      )}
      <ul className={styles.pageList}>
        {chapter.pages.map((page: string, pageIndex: number) => (
          // For guides, display numbers in front of the chapter and page titles.
          <li key={page}>
            {sectionName.toLowerCase() === "guides" && (
              <span className={styles.numbering}>
                {`${chapterIndex}.${pageIndex + 1} `}
              </span>
            )}
            <Link
              to={`/docs/${toKebabCase(
                chapter.title || sectionName
              )}/${toKebabCase(page)}`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Landing page layout in 3 main columns and 1/5-sized cards
 *
 * - Left: Guide Masonry in 3 subsections
 * - Center: Theory Section
 * - Right column: Archives and Templates
 */
function LandingPageContent() {
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

// Homepage Layout
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <LandingPageContent />
      </main>
    </Layout>
  );
}
