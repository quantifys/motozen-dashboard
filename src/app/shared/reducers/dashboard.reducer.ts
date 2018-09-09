import * as dashboardActions from '../actions/dashboard.actions';

export interface State {
  data: any;
}

const initialState: State = {
  data: null
};

export function reducer(state = initialState, action: dashboardActions.Actions): State {
  switch (action.type) {
    case dashboardActions.FETCH_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
}
