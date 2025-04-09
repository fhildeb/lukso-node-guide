import { ChapterCard } from "../ChapterCard/ChapterCard";

// Grid to render individual content chapters in multi-columns
export function SectionGrid({
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
