import { Component, OnInit } from '@angular/core';
import {interval, timer} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = interval(1000);
    interval$.subscribe(val => console.log('stream 1 ' + val));
    interval$.subscribe(val => console.log('stream 2 ' + val));
    const timer$ = timer(3000, 1000);
    timer$.subscribe(val => console.log('timer 1 ' + val));

  }

}
