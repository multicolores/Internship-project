import { Action, createReducer } from '@ngrx/store';

export interface State {
  test: boolean;
}

export const getInitialState: () => State = () => ({
  test: true,
});

const homeUiReducer = createReducer(getInitialState());

export function reducer(state: State | undefined, action: Action): State {
  return homeUiReducer(state, action);
}
