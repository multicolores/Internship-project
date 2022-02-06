import * as fromHomeUiReducer from '@modules/home/store/reducers/home-ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface HomeState {
  ui: fromHomeUiReducer.State;
}

export const getInitialHomeState: () => HomeState = () => ({
  ui: fromHomeUiReducer.getInitialState(),
});

export const reducers: ActionReducerMap<HomeState> = {
  ui: fromHomeUiReducer.reducer,
};
