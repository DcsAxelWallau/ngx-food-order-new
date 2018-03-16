import { OnDestroy } from '@angular/core';
import { AnyAction } from 'redux';
import { Observable } from 'rxjs/Observable';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { dispatch } from '../redux/utils';

export abstract class ContainerComponent implements OnDestroy {
  protected onDestroy$ = new Subject();

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public subscribeToObservable<T>(obs$: Observable<T>, callback: (data: T) => void) {
    obs$.pipe(takeUntil(this.onDestroy$)).subscribe(callback.bind(this));
  }

  public dispatchIfNotLoaded(loaded$: Observable<boolean>, callback: () => AnyAction): void {
    this.subscribeToObservable(loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        dispatch(callback());
      }
    });
  }
}
