import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';
import {ActivatedRoute} from '@angular/router';
import {createObservable} from '../common/utils';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  courseId:number;

  @ViewChild('searchInput') input: ElementRef;

  constructor(private  route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.course$ = createObservable(`/api/courses/${this.courseId}`);
  }

  ngAfterViewInit(): void {
    this.lessons$ = createObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100`)
      .pipe(
        map(res => res['payload'])
      );
  }

}
