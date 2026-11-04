import type { Question } from "./types";

export const isOpenStax = (question: Question) => question.source_url.startsWith("https://openstax.org/");

export const bookUrl = (question: Question) => question.source_url.replace(/\/pages\/.*$/, "/pages/1-introduction");
