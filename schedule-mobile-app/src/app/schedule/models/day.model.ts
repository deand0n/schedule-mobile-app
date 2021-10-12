import { Lesson } from "./lesson.model";

export interface Day {
  name: string;
  date: string;
  lessons: Lesson[];
}
