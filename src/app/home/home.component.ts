import { Component, OnInit } from '@angular/core';

import {noop, Observable, of, throwError} from 'rxjs';
import {createObservable} from '../common/utils';
import {Course} from '../model/course';
import {catchError, filter, finalize, map, shareReplay, tap} from 'rxjs/operators';

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
        catchError(err => {
          console.log('Error logged: ', err);
          return throwError(err);
        }),
        finalize(() => {
          console.log('Finalize is called');
        }),
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload'] as Course[])),
        shareReplay()
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
