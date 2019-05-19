import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {concat, forkJoin, fromEvent, Observable} from 'rxjs';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';
import {ActivatedRoute} from '@angular/router';
import {createObservable} from '../common/utils';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  startWith,
  switchMap,
  take,
  tap,
  throttleTime,
  withLatestFrom
} from 'rxjs/operators';
import {debug, RxJsLoggingLevel, setRxJsLoggingLevel} from '../common/debug';
import {Store} from '../common/store.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  courseId: number;

  @ViewChild('searchInput') input: ElementRef;

  constructor(private  route: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.params['id']);
    this.course$ = this.store.selectCourseById(this.courseId);
    /*this.course$ = this.store.selectCourseById(this.courseId)
      .pipe(
        // first()
        take(1)
      );*/
    // const course$ = createObservable(`/api/courses/${this.courseId}`);
    // this.course$.subscribe(course => this.course = course);
    this.loadLessons()
      .pipe(
        withLatestFrom(this.course$)
      )
      .subscribe(([lessons, course]) => {
        console.log('course', course);
        console.log('lessons', lessons);
      });

  }

  ngAfterViewInit(): void {
    const searchLessons$ =  fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search))
      );

    const initialLessons$ = this.loadLessons();

    this.lessons$ = concat(initialLessons$, searchLessons$);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => res['payload'])
      );
  }

}
