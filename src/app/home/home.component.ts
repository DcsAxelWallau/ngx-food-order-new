import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerComponent } from '@dcs/ngx-utils';

import { greetWorld, fetchUser } from '../backend/home/home.actions';
import { homeGreetingSelector } from '../backend/home/home.selectors';
import { IState } from '../backend/interfaces';

@Component({
  selector: 'dcs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends ContainerComponent implements OnInit {
  @select(homeGreetingSelector) public greeting$: Observable<string>;
  public greeting: string = '';

  constructor(private store: NgRedux<IState>) {
    super();
  }

  public ngOnInit() {
    this.subscribeToObservable(this.greeting$, greeting => {
      this.greeting = greeting;
    });
    this.store.dispatch(greetWorld());
    this.store.dispatch(fetchUser('2'));
  }
}
