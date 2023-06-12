import grupos from "../../datosParaProbar/grupos";
// Definición de acciones
const AGREGAR_GRUPO = 'AGREGAR_GRUPO';
const OBTENER_GRUPOS = 'OBTENER_GRUPOS';
const ELIMINAR_GRUPO = 'ELIMINAR_GRUPO';


const initialState = {
    grupos: grupos
};

const gruposReducer = (state = initialState, action) => {
    switch (action.type) {
      case AGREGAR_GRUPO:
        return {
          ...state,
          grupos: [...state.grupos, action.payload]
        };
    case OBTENER_GRUPOS:
        return{
            ...state,
            grupos: action.payload
        }
    case ELIMINAR_GRUPO:
        const grupoId = action.payload;
        return {
            ...state,
            grupos: state.grupos.filter(grupo => grupo.id !== grupoId)
        };
    default:
        return state;
    }
};

export default gruposReducer;