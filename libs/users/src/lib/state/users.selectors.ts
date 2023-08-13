import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersPartialState, UsersState, USERS_FEATURE_KEY } from './users.reducer';

export const getUsersState = createFeatureSelector<UsersPartialState, UsersState>(USERS_FEATURE_KEY);

export const getUser = createSelector(getUsersState, (state) => state.user);
export const getUserIsAuth = createSelector(getUsersState, (state) => state.isAuthenticated);
