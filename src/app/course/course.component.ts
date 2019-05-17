import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {concat, fromEvent, Observable} from 'rxjs';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';
import {ActivatedRoute} from '@angular/router';
import {createObservable} from '../common/utils';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';

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
    this.course$ = createObservable(`/api/courses/${this.courseId}`);

  }

  ngAfterViewInit(): void {
    this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap( search => this.loadLessons(search))
      );
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => res['payload'])
      );
  }

}
