import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    username: string;
    password: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface SetUsernameAction { type: 'SET_USERNAME', payload: string }
export interface SetPasswordAction { type: 'SET_PASSWORD', payload: string }
export interface SetIsButtonDisabledAction { type: 'SET_BUTTON_DISABLED', payload: boolean }
export interface LoginSuccessAction { type: 'LOGIN_SUCCESS', payload: string }
export interface LoginFailedAction { type: 'LOGIN_FAILED', payload: string }
export interface SetIsErrorAction { type: 'SET_ERROR', payload: boolean }
export interface ResetAction { type: 'RESET' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = SetUsernameAction | SetPasswordAction | SetIsButtonDisabledAction | LoginSuccessAction | LoginFailedAction | SetIsErrorAction | ResetAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setUsername: (username: string) => ({ type: 'SET_USERNAME', payload: username } as SetUsernameAction),
    setPassword: (password: string) => ({ type: 'SET_PASSWORD', payload: password } as SetPasswordAction),
    setIsButtonDisabled: (btnDisabled: boolean) => ({ type: 'SET_BUTTON_DISABLED', payload: btnDisabled } as SetIsButtonDisabledAction),
    loginSuccess: (success: string) => ({ type: 'LOGIN_SUCCESS', payload: success } as LoginSuccessAction),
    loginFailed: (failed: string) => ({ type: 'LOGIN_FAILED', payload: failed } as LoginFailedAction),
    setIsError: (isError: boolean) => ({ type: 'SET_ERROR', payload: isError } as SetIsErrorAction),
    reset: () => ({ type: 'RESET' } as ResetAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    const initialState = {
        username: '',
        password: '',
        isButtonDisabled: true,
        helperText: '',
        isError: false
    };

    if (state === undefined) {
        return initialState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            };
        case 'SET_BUTTON_DISABLED':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'LOGIN_FAILED':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'SET_ERROR':
            return {
                ...state,
                isError: action.payload
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};
