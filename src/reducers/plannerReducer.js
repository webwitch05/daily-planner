export function plannerReducer(state, action) {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, current: action.payload };
        
        case 'START_EDIT':
            return { 
                ...state, 
                history: state.current 
            };
        
        case 'UNDO':
            return { 
                ...state, 
                current: state.history 
            };
        
        default:
            return state;
    }
}