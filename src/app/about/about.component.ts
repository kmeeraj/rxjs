import { Component, OnInit } from '@angular/core';
import {AsyncSubject, BehaviorSubject, concat, interval, merge, noop, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {createObservable} from '../common/utils';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const subject = new Subject();
    // const subject = new AsyncSubject();
    const subject = new ReplaySubject();
    // const subject = new BehaviorSubject(0);
    const series$ = subject.asObservable();

    // series.subscribe(console.log);
    series$.subscribe(val => console.log('first subscription: ' + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    // subject.complete();
    /*setTimeout(() => {
      series$.subscribe(val => console.log('late subscription : ' + val));
      subject.next(4);
    }, 3000);*/

    setTimeout(() => {
      series$.subscribe(val => console.log('second subscription : ' + val));
      subject.next(4);
    }, 3000);
  }

}
