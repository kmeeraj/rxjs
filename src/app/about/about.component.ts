import { Component, OnInit } from '@angular/core';
import {concat, interval, merge, noop, Observable, of} from 'rxjs';
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

    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 5000);

    const http$ = createObservable('api/courses');
    const sub = http$.subscribe(console.log);
    setTimeout(() => sub.unsubscribe(), 0);
  }

}
