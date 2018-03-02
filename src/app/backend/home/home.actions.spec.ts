import { greetWorld, setName } from './home.actions';

describe('home actions', () => {
  describe('setName', () => {
    it('returns the correct action object', () => {
      expect(setName('Arthur')).toEqual({
        type: 'HOME_SET_NAME',
        payload: 'Arthur',
      });
    });
  });

  describe('greetWorld', () => {
    it('returns the correct action object', () => {
      expect(greetWorld()).toEqual({
        type: 'HOME_GREET_WORLD',
      });
    });
  });
});
