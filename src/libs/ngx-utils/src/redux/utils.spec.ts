import { dispatch } from './utils';

describe('redux utils', () => {
  describe('dispatch', () => {
    it('just returns the action', () => {
      expect(dispatch({ type: 'FOOO' })).toEqual({ type: 'FOOO' });
    });

    describe('with a configured store', () => {
      let instance: any;

      beforeEach(() => {
        instance = { dispatch: jest.fn() };
      });

      it('dispatches the given action', () => {
        dispatch({ type: 'FOOO' }, instance);
        expect(instance.dispatch).toHaveBeenCalledWith({ type: 'FOOO' });
      });

      it('throws if not given a valid action', () => {
        expect(() => dispatch({ wrong: 'format' } as any)).toThrowError(TypeError);
      });

      it('returns the action', () => {
        expect(dispatch({ type: 'FOOO' })).toEqual({ type: 'FOOO' });
      });
    });
  });
});
