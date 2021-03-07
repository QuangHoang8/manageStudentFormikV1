import { actionType } from '../action/actionType';

export const status = (state = {
    searching: false,
    searchValue: ''
}, action) => {
    switch(action.type) {
        case (actionType.CHANGE_SEARCHING_VALUE): {
            return {
                ...state,
                searching: false,
                searchValue: action.payload.value
            }
        }
        case (actionType.SEARCH_STUDENT): {
            return {
                ...state,
                searching: true
            }
        }
        default: return state;
    }
}