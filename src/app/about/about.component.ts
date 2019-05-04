import { Component, OnInit } from '@angular/core';
import {fromEvent, interval, timer} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = timer(3000, 1000);
    const sub = interval$.subscribe(val => console.log('stream 1 ' + val));
    setTimeout(() => sub.unsubscribe(), 10000);

    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      evt => console.log(evt) ,
      err => console.log(err),
      () => console.log('completed')
    );
  }

}
