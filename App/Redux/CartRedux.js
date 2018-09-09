import * as Actions from './Actions/ActionTypes'

export const reducer = (state = [], action) => {
    switch (action.type) {
        case Actions.ADD_ITEM:
            var newState = state;
            newState.push(action.payload);
            return newState;
        case Actions.REMOVE_ITEM:
            return state.filter(({ item }) => item.id !== action.payload.id);
        case Actions.GET_ITEMS:
            return state;
        default:
            return state;
    }
}

