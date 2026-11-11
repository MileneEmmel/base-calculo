import type { LessonDeepening, StudyLesson } from "./studyBasics";

export function withDeepening(lesson: StudyLesson, deep?: LessonDeepening): StudyLesson {
  if (!deep) return lesson;
  return { ...lesson, sections: [...lesson.sections, ...deep.sections], checks: [...lesson.checks, ...deep.checks], pitfall: deep.pitfall ?? lesson.pitfall };
}
