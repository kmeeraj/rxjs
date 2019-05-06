import { Component, OnInit } from '@angular/core';
import {createHttpObservable} from '../common/utils';
import {noop} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const http$ = createHttpObservable('api/courses');

    http$.subscribe(
      courses => console.log(courses),
      noop(),
      () => console.log('complete')
    );
  }



}
