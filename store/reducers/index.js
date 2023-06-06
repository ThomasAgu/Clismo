import { combineReducers } from 'redux';
import loginReducer from './loginReducer'; // Importa tu reducer de inicio de sesión

const rootReducer = combineReducers({
  login: loginReducer, // Agrega tu reducer de inicio de sesión al rootReducer
  // ...otros reducers si los tienes
});

export default rootReducer;
