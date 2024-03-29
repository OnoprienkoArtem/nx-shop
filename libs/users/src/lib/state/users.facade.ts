import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {

    currentUser$ = this.store.pipe(select(UsersSelectors.getUser as any));
    isAthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth as any));

    constructor(private readonly store: Store) {}

    buildUserSession() {
        this.store.dispatch(UsersActions.buildUserSession());
    }
}
