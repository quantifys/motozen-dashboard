import { User, PageData, UserStats } from '../models';
import * as userActions from '../actions/user.actions';

export interface State {
  allUsers: User[];
  loggedUser: User;
  currentUserStats: UserStats;
  userPageStatus: PageData;
}

const initialState: State = {
  allUsers: [],
  loggedUser: new User({}),
  currentUserStats: new UserStats({}),
  userPageStatus: new PageData({})
};

export function reducer(state = initialState, action: userActions.Actions): State {
  let users: User[] = [];
  switch (action.type) {
    case userActions.LOGIN_USER_ACTION:
      return Object.assign({}, state, {
        loggedUser: new User(action.payload)
      });
    case userActions.VALIDATE_USER_TOKEN_COMPLETE_ACTION:
      return Object.assign({}, state, {
        loggedUser: new User(action.payload)
      });
    case userActions.SIGNOUT_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        loggedUser: new User({})
      });
    case userActions.FETCH_ALL_USERS_ACTION:
      return Object.assign({}, state, {
        allUsers: []
      });
    case userActions.FETCH_ALL_USERS_COMPLETE_ACTION:
      users = action.payload.data.map(user => new User(user));
      return Object.assign({}, state, {
        allUsers: [...users],
        userPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case userActions.FETCH_USER_ACTION:
      return Object.assign({}, state, {
        currentUserStats: new UserStats({})
      });
    case userActions.FETCH_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentUserStats: new UserStats(action.payload)
      });
    case userActions.DELETE_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allUsers: [...state.allUsers.filter(user => user.id != action.payload ? user : null)],
        currentUserStats: new UserStats({})
      });
    case userActions.UPDATE_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allUsers: [...state.allUsers.map(user => user.id != action.payload.id ? user : new User(action.payload))]
      });
    case userActions.CLEAR_CURRENT_USER_ACTION:
      return Object.assign({}, state, {
        currentUserStats: new UserStats({})
      });
    case userActions.CREATE_NEW_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allUsers: [...state.allUsers, new User(action.payload)]
      });
    case userActions.DELETE_USER_FAILED_ACTION:
      return Object.assign({}, state, {
        currentUserStats: new UserStats({})
      });
    default:
      return state;
  }
}
