import {Component, OnInit} from '@angular/core';
import {Store} from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'rxjs tutorial';

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.init();
  }
}
