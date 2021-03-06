import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { handleGetUsers } from '../helper/api-helper';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DataState {
    isLoading: boolean;
    data: Data[];
}

export interface Data {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestDataAction {
    type: 'REQUEST_DATA';
}

interface ReceiveDataAction {
    type: 'RECEIVE_DATA';
    data: Data[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestDataAction | ReceiveDataAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestData: (token: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.data) {
            handleGetUsers(token, (data: any) => {
                dispatch({ type: 'RECEIVE_DATA', data: data });
            }, null);
            //fetch(`users`) // TODO: config path; use api-helper
            //    .then(response => response.json() as Promise<Data[]>)
            //    .then(data => {
            //        dispatch({ type: 'RECEIVE_DATA', data: data });
            //    });

            dispatch({ type: 'REQUEST_DATA' });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DataState = { data: [], isLoading: false };

export const reducer: Reducer<DataState> = (state: DataState | undefined, incomingAction: Action): DataState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_DATA':
            return {
                data: state.data,
                isLoading: true
            };
        case 'RECEIVE_DATA':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                data: action.data,
                isLoading: false
            };
    }

    return state;
};
