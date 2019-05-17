import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {forkJoin, fromEvent, Observable} from 'rxjs';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';
import {ActivatedRoute} from '@angular/router';
import {createObservable} from '../common/utils';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, tap, throttleTime} from 'rxjs/operators';
import {debug, RxJsLoggingLevel, setRxJsLoggingLevel} from '../common/debug';

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

  constructor(private  route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    const course$ = createObservable(`/api/courses/${this.courseId}`);
    const lessons$ = this.loadLessons();
    forkJoin(course$, lessons$)
      .pipe(
        tap(([course, lessons]) => {
            console.log('course', course);
            console.log('lessons', lessons);
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
     fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        throttleTime(500)
      )
      .subscribe(console.log);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => res['payload'])
      );
  }

}
