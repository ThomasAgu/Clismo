// Definición de acciones
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

// Estado inicial
const initialState = {
  isLoggedIn: false,
  user: {
    id: -1,
    role: '',
  },
};

// Reducer
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {
          id: -1,
          role: '',
        }
      };
    default:
      return state;
  }
};

export default loginReducer;
