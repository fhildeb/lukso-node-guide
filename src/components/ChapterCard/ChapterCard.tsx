import Link from "@docusaurus/Link";
import styles from "./ChapterCard.module.css";

// Rendering Cards to structure Headings and Pages
export function ChapterCard({
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
          <Link
            to={`/docs/${toKebabCase(sectionName)}/${toKebabCase(
              chapter.title
            )}`}
          >
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
              to={`/docs/${toKebabCase(sectionName)}/${toKebabCase(
                chapter.title
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

// Helper function for link path creation
function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}
