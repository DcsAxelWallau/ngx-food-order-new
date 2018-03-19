import { rootReducer } from './root.reducer';

describe('root reducer', () => {
  it('acts as a valid reducer', () => {
    const newState = rootReducer(undefined as any, { type: 'ANY' });

    expect(Object.keys(newState)).toEqual([
      'router',
      'error',
      'home',
      'users',
      'auth',
      'products',
      'order',
    ]);
  });
});
