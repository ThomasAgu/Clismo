const AGREGAR_ENTRENAMIENTO = 'AGREGAR_ENTRENAMIENTO';
const OBTENER_ENTRENAMIENTOS= 'OBTENER_ENTRENAMIENTOS';

const initialState = {
    entrenamientos: []
};


const entrenamientosReducer = (state = initialState, action) => {
    switch (action.type){
        case AGREGAR_ENTRENAMIENTO:
            return {
                ...state,
                entrenamientos: [...state.entrenamientos, action.payload]
            };

        case OBTENER_ENTRENAMIENTOS:
            return{
                ...state,
                entrenamientos: action.payload
            }
        default: 
            return state;
    }
};

export default entrenamientosReducer