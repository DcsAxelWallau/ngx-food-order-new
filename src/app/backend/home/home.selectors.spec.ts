import { homeGreetingSelector } from './home.selectors';

describe('home selectors', () => {
  let state: any;

  beforeAll(() => {
    state = {
      home: 'World',
    };
  });

  describe('homeGreetingSelector', () => {
    it('returns the correct substate', () => {
      expect(homeGreetingSelector(state)).toEqual('World');
    });
  });
});
