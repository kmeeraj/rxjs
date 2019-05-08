import { Component, OnInit } from '@angular/core';
import {concat, interval, noop, Observable, of} from 'rxjs';
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
    // const source1$ = of(1, 2, 3);
    const source1$ = interval(1000);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);
    const result$ = concat(source1$, source2$, source3$);
    // result$.subscribe(val => console.log(val));
    result$.subscribe(console.log);
  }

}
