import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SignupState {
    firstname: string;
    lastname: string;
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

export interface SetFirstnameAction { type: 'SET_FIRSTNAME', payload: string }
export interface SetLastnameAction { type: 'SET_LASTNAME', payload: string }
export interface SetUsernameAction { type: 'SET_USERNAME', payload: string }
export interface SetPasswordAction { type: 'SET_PASSWORD', payload: string }
export interface SetIsButtonDisabledAction { type: 'SET_BUTTON_DISABLED', payload: boolean }
export interface SignupSuccessAction { type: 'SIGNUP_SUCCESS', payload: string }
export interface SignupFailedAction { type: 'SIGNUP_FAILED', payload: string }
export interface SetIsErrorAction { type: 'SET_ERROR', payload: boolean }
export interface ResetAction { type: 'RESET' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = SetFirstnameAction | SetLastnameAction | SetUsernameAction | SetPasswordAction | SetIsButtonDisabledAction | SignupSuccessAction | SignupFailedAction | SetIsErrorAction | ResetAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setFirstname: (firstname: string) => ({ type: 'SET_FIRSTNAME', payload: firstname } as SetFirstnameAction),
    setLastname: (lastname: string) => ({ type: 'SET_LASTNAME', payload: lastname } as SetLastnameAction),
    setUsername: (username: string) => ({ type: 'SET_USERNAME', payload: username } as SetUsernameAction),
    setPassword: (password: string) => ({ type: 'SET_PASSWORD', payload: password } as SetPasswordAction),
    setIsButtonDisabled: (btnDisabled: boolean) => ({ type: 'SET_BUTTON_DISABLED', payload: btnDisabled } as SetIsButtonDisabledAction),
    signupSuccess: (success: string) => ({ type: 'SIGNUP_SUCCESS', payload: success } as SignupSuccessAction),
    signupFailed: (failed: string) => ({ type: 'SIGNUP_FAILED', payload: failed } as SignupFailedAction),
    setIsError: (isError: boolean) => ({ type: 'SET_ERROR', payload: isError } as SetIsErrorAction),
    reset: () => ({ type: 'RESET' } as ResetAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<SignupState> = (state: SignupState | undefined, incomingAction: Action): SignupState => {
    const initialState = {
        firstname: '',
        lastname: '',
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
        case 'SET_FIRSTNAME':
            return {
                ...state,
                firstname: action.payload
            };
        case 'SET_LASTNAME':
            return {
                ...state,
                lastname: action.payload
            };
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
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'SIGNUP_FAILED':
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