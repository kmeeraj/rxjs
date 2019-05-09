import { Component, OnInit } from '@angular/core';

import {noop, Observable, of} from 'rxjs';
import {createObservable} from '../common/utils';
import {Course} from '../model/course';
import {catchError, filter, map, shareReplay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  constructor() { }

  ngOnInit() {
    const http$: Observable<Course[]> = createObservable('api/courses');

    const courses$: Observable<Course[]>  = http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload'] as Course[])),
        shareReplay(),
        catchError(err => of([{
          id: 0,
          description: 'RxJs In Practice Course',
          iconUrl: 'https://s3-us-west-1.amazonaws.com/angular/course-images/rxjs-in-practice-course.png',
          courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
          longDescription: 'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples',
          category: 'BEGINNER',
          lessonsCount: 10
        }]))
      );
    courses$.subscribe(res => console.log(res));
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );
    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );

  }

}
