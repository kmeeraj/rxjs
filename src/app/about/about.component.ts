import { Component, OnInit } from '@angular/core';
import {noop, Observable} from 'rxjs';
import {createObservable} from '../common/utils';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createObservable();

    const courses$ = http$
      .pipe(
        map(res => Object.values(res['payload']))
      );

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }

}
