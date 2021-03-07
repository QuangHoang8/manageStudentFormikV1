import { actionType } from '../action/actionType';

export const auth = (state = {
    loadingCount: 0,
    searching: false
}, action) => {
    switch(action.type) {
        case actionType.CHANGE_LOADING_COUNT: {
            return {
                ...state,
                loadingCount: state.loadingCount + 1
            }
        }
        case actionType.SEARCH_STUDENT: {
            return {
                ...state,
                searching: action.payload.value
            }
        }
        default: return state;
    }
}