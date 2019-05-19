import { Component, OnInit } from '@angular/core';

import {noop, Observable, of, throwError, timer} from 'rxjs';
import {createObservable} from '../common/utils';
import {Course} from '../model/course';
import {catchError, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {Store} from '../common/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  constructor(private store: Store) { }

  ngOnInit() {

    const courses$ = this.store.courses$;
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    this.advancedCourses$ = this.store.selectAdvancedCourses();

  }

}
