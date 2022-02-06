import { getInitialState, reducer } from '@modules/home/store/reducers/home-ui.reducer';
import { Action } from '@ngrx/store';

describe('an unknown action', () => {
  it('should return the previous state', () => {
    const action = {} as Action;

    const result = reducer(getInitialState(), action);

    expect(result).toEqual(getInitialState());
  });
});
