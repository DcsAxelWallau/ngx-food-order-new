import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { ContainerComponent } from './container-component.class';

describe('ContainerComponent', () => {
  class TestComponent extends ContainerComponent {}

  let subject: TestComponent;

  beforeEach(() => {
    subject = new TestComponent();
  });

  describe('ngOnDestroy', () => {
    it('calls onDestroy$.next', () => {
      spyOn((subject as any).onDestroy$, 'next');
      subject.ngOnDestroy();
      expect((subject as any).onDestroy$.next).toHaveBeenCalled();
    });
  });

  describe('subscribeToObservable', () => {
    let cb: jest.Mock<any>;
    let obs$: Subject<any>;

    beforeEach(() => {
      cb = jest.fn();
      obs$ = new Subject();
      subject.subscribeToObservable(obs$, cb);
    });

    it('calls the callback fn', () => {
      obs$.next();
      expect(cb).toHaveBeenCalled();
    });

    it('unsubscribes on ngOnDestroy', () => {
      obs$.next();
      subject.ngOnDestroy();
      obs$.next();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  describe('dispatchIfNotLoaded', () => {
    let cb: jest.Mock;

    beforeEach(() => {
      cb = jest.fn().mockImplementation(() => ({ type: 'TEST_ACTION' }));
    });

    it('dispatches the given callback if not loaded', () => {
      subject.dispatchIfNotLoaded(of(false), cb);
      expect(cb).toHaveBeenCalled();
    });

    it('dispatches the given callback only once', () => {
      subject.dispatchIfNotLoaded(of(false, false, false), cb);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('ddoes nothing if already loaded', () => {
      subject.dispatchIfNotLoaded(of(true, false), cb);
      expect(cb).not.toHaveBeenCalled();
    });
  });
});
