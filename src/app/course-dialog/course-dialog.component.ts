import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Course} from '../model/course';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {concatMap, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {fromEvent} from 'rxjs';
import {Store} from '../common/store.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  course: Course;

  @ViewChild('saveButton') saveButton: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private store: Store
  ) {
    this.course = course;
    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(filter(() => this.form.valid),
        concatMap(changes => this.saveCourses(changes)))
      .subscribe(
        // changes => this.saveCourses(changes)
      );
  }

  private saveCourses(changes) {
    return fromPromise(fetch(`api/courses/${this.course.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  save() {
    this.store.saveCourse(this.course.id, this.form.value)
      .subscribe(
        () => this.close(),
        err => console.log("error log",err)
      );
  }

  ngAfterViewInit(): void {
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(
        exhaustMap(() => this.saveCourses(this.form.value))
      ).subscribe();
  }

  private close() {
    this.dialogRef.close();
  }
}
