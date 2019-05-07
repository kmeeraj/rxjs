import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {noop} from 'rxjs';
import {createObservable} from '../common/utils';
import {Course} from '../model/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  beginnerCourses: Course[];
  advancedCourses: Course[];
  constructor() { }

  ngOnInit() {
    const http$ = createObservable();

    const courses$ = http$
      .pipe(
        map(res => Object.values(res['payload']))
      );

    courses$.subscribe(
      courses => {
        this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
      },
      noop,
      () => console.log('completed')
    );
  }

}
