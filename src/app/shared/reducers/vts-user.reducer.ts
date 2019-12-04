import * as vtsUserActions from '../actions/vts-user.actions';
import { VtsUser, PageData } from '../models';

export interface State {
  allVtsUsers: VtsUser[];
  currentVtsUser: VtsUser;
  currentVtsUserPageStatus: PageData;
}

const initialState: State = {
  allVtsUsers: [],
  currentVtsUser: new VtsUser({}),
  currentVtsUserPageStatus: new PageData({})
};

export function reducer(state = initialState, action: vtsUserActions.Actions): State {
  let inventories: VtsUser[] = [];
  switch (action.type) {
    case vtsUserActions.FETCH_ALL_VTS_USERS_ACTION:
      return Object.assign({}, state, {
        allCertificates: []
      });
    case vtsUserActions.FETCH_ALL_VTS_USERS_COMPLETE_ACTION:
      inventories = action.payload.data.map(user => new VtsUser(user));
      return Object.assign({}, state, {
        allVtsUsers: [...inventories],
        currentVtsUserPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case vtsUserActions.FETCH_VTS_USER_ACTION:
      return Object.assign({}, state, {
        currentVtsUser: new VtsUser({})
      });
    case vtsUserActions.FETCH_VTS_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVtsUser: new VtsUser(action.payload)
      });
    case vtsUserActions.DELETE_VTS_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVtsUsers: [...state.allVtsUsers.filter(user => user.id !== action.payload ? user : null)]
      });
    case vtsUserActions.UPDATE_VTS_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVtsUsers: [...state.allVtsUsers.map(user => user.id !== action.payload.id ? user : new VtsUser(action.payload))]
      });
    case vtsUserActions.CREATE_VTS_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVtsUsers: [...state.allVtsUsers, new VtsUser(action.payload)]
      });
    case vtsUserActions.CLEAR_VTS_USER_ACTION:
      return Object.assign({}, state, {
        currentVtsUser: new VtsUser({})
      });
    default:
      return state;
  }
}
