import { ActionReducerMap, Action, createSelector } from "@ngrx/store";

import * as fromUser from "./user.reducer";

export interface State {
  users: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer
};

export const users = (state: State) => state.users;
export const getFilteredUsers = createSelector(users, (state: fromUser.State) => state.filteredUsers.filter(user => user.id != state.loggedUser.id));
export const getAllUsers = createSelector(users, (state: fromUser.State) => state.allUsers.filter(user => user.id != state.loggedUser.id));
export const getLoggedUser = createSelector(users, (state: fromUser.State) => state.loggedUser);
export const getCurrentUser = createSelector(users, (state: fromUser.State) => state.currentUser);