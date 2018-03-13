import * as lolex from 'lolex';
import { IApiActionHandlers } from './../interfaces';
import { defaultDataProcessor, getHandlers, getUrl } from './api-request.epic';

describe('apiRequestEpic', () => {
  describe('getUrl', () => {
    const env: any = {
      apiUrl: 'http://www.example.com/api',
    };

    it('returns the original URL if absolute http', () => {
      const url = 'http://my.other.domain/api/users';
      expect(getUrl(url, env)).toEqual(url);
    });

    it('returns the original URL if absolute https', () => {
      const url = 'https://my.other.domain/api/users';
      expect(getUrl(url, env)).toEqual(url);
    });

    it('returns the original URL if absolute http(s)', () => {
      const url = '//my.other.domain/api/users';
      expect(getUrl(url, env)).toEqual(url);
    });

    it('prepends apiUrl if relative', () => {
      const url = '/users';
      expect(getUrl(url, env)).toEqual(`${env.apiUrl}/users`);
    });

    it('prepends apiUrl if relative', () => {
      const url = 'users';
      expect(getUrl(url, env)).toEqual(`${env.apiUrl}/users`);
    });
  });

  describe('getHandlers', () => {
    let subject: IApiActionHandlers;

    describe('if handlers is a string', () => {
      let clock: lolex.LolexClock<number>;

      beforeEach(() => {
        clock = lolex.install();
        subject = getHandlers('USER_FETCH', { value: 42 });
      });

      afterEach(() => {
        clock.uninstall();
      });

      describe('start', () => {
        it('returns the correct action', () => {
          expect(subject.start('hello')).toEqual({
            type: 'USER_FETCH_START',
            payload: 'hello',
            meta: { value: 42 },
          });
        });
      });

      describe('success', () => {
        it('returns the correct action', () => {
          const result = subject.success('hello');
          expect(result).toEqual({
            type: 'USER_FETCH_SUCCESS',
            payload: 'hello',
            meta: { value: 42, updatedAt: new Date() },
          });
        });
      });

      describe('error', () => {
        it('returns the correct action', () => {
          const error: any = new Error('ARGH');

          expect(subject.error(error)).toEqual({
            type: 'USER_FETCH_ERROR',
            payload: error,
            error: true,
            meta: { value: 42 },
          });
        });
      });

      describe('complete', () => {
        it('returns the correct action', () => {
          expect(subject.complete()).toEqual({
            type: 'USER_FETCH_COMPLETE',
            meta: { value: 42 },
          });
        });
      });
    });

    describe('if handlers is not a string', () => {
      it('just returns given handlers', () => {
        const handlers: any = { hello: 'TESTS' };
        expect(getHandlers(handlers)).toBe(handlers);
      });
    });
  });

  describe('defaultDataProcessor', () => {
    it('returns the original data', () => {
      expect(defaultDataProcessor(42)).toEqual(42);
    });
  });
});
