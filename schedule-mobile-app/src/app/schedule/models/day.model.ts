import {Lesson} from './lesson.model';

export interface Day {
  name: string;
  date: Date;
  lessons: Lesson[];
}
