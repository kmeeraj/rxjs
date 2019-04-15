import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.addEventListener('click', evt => {
      console.log(evt);
    });
    let counter = 0;
    setInterval(() => {
      console.log(counter);
      counter++;
    },2000);

    setTimeout(() => {
      console.log('finished..');
    },4000);
  }

}
