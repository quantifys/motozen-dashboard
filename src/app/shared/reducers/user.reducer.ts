import { User } from '../models';

import * as userActions from '../actions/user.actions';

export interface State {
  allUsers: User[];
  loggedUser: User;
  showUserModal: boolean;
  currentUser: User;
}

const initialState: State = {
  allUsers: [],
  loggedUser: new User({}),
  showUserModal: false,
  currentUser: new User({})
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
    case userActions.FETCH_ALL_USERS_COMPLETE_ACTION:
      users = action.payload.map(user => new User(user));
      return Object.assign({}, state, {
        allUsers: [...users]
      });
    case userActions.FILTER_USERS_COMPLETE_ACTION:
      users = action.payload.map(user => new User(user));
      return Object.assign({}, state, {
        allUsers: [...users]
      });
    case userActions.FETCH_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentUser: new User(action.payload)
      });
    case userActions.DELETE_USER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allUsers: [...state.allUsers.filter(user => user.id != state.currentUser.id ? user : null)],
        currentUser: new User({})
      });
    case userActions.DELETE_USER_ACTION:
      return Object.assign({}, state, {
        currentUser: new User({
          id: action.payload
        })
      });
    // case userActions.OPEN_USER_MODAL_ACTION:
    //   return Object.assign({}, state, {
    //     showUserModal: true
    //   });
    // case userActions.CLOSE_USER_MODAL_ACTION:
    //   return Object.assign({}, state, {
    //     showUserModal: false
    //   });
    // case userActions.CREATE_USER_COMPLETE_ACTION:
    //   return Object.assign({}, state, {
    //     allUsers: [...state.allUsers, new User(action.payload)]
    //   });
    // case userActions.DELETE_USER_FAILED_ACTION:
    //   return Object.assign({}, state, {
    //     currentUserID: null
    //   });
    // case userActions.UPDATE_USER_COMPLETE_ACTION:
    //   return Object.assign({}, state, {
    //     allUsers: [...state.allUsers.map(user => user.id != action.payload.id ? user : new User(action.payload))]
    //   });

    default:
      return state;
  }
}
