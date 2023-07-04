// Definición de acciones
const SET_OPCION = 'SET_OPCION';
const GET_OPCION = 'GET_OPCION';

const initialState = {
    route: '/Home'
}

const navBarReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_OPCION:
            return {
                ...state,
                route: action.payload
            };
        case GET_OPCION:
            return{
                ...state,
                route: action.payload
            }
        default:
            return state;
    }
}

export default navBarReducer