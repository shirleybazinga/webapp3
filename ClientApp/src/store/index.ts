import * as Data from './Data';
import * as Signup from './Signup';
import * as Login from './Login';

// The top-level state object
export interface ApplicationState {
    login: Login.LoginState | undefined;
    signup: Signup.SignupState | undefined;
    data: Data.DataState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    login: Login.reducer,
    signup: Signup.reducer,
    data: Data.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
