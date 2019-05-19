import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {Course} from '../model/course';
import {createObservable} from './utils';
import {delayWhen, filter, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class Store {

  private subject = new BehaviorSubject([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$: Observable<Course[]> = createObservable('api/courses');
    http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload'] as Course[])),
      ).subscribe(course => this.subject.next(course));
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');
  }
  filterByCategory(category: string) {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(courses => courses.category === category))
      );
  }


  saveCourse(courseId: number, changes: any): Observable<any> {
      const courses = this.subject.getValue();
      const courseIndex = courses.findIndex( course => course.id === courseId);

      const newCourses = courses.slice(0);
      newCourses[courseIndex] = {
        ...courses[courseIndex],
        ...changes
      };

      this.subject.next(newCourses);
      return fromPromise(fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
  }

  selectCourseById(courseId: number) {
    return this.courses$
      .pipe(
        map(courses => courses
          .find(course => course.id === courseId)),
        filter(course => !!course)

      );
  }
}
