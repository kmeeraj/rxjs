import { Component, OnInit } from '@angular/core';

import {noop, Observable, of, throwError, timer} from 'rxjs';
import {createObservable} from '../common/utils';
import {Course} from '../model/course';
import {catchError, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';

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
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(2000))
        ))
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
