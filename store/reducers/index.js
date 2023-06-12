import { combineReducers } from 'redux';
import loginReducer from './loginReducer'; // Importa tu reducer de inicio de sesión
import gruposReducer from './gruposReducer'
import entrenamientosReducer from './entrenamientosReduces';

const rootReducer = combineReducers({
  login: loginReducer, 
  grupos: gruposReducer,
  entrenamientos: entrenamientosReducer
  // ...otros reducers si los tienes
});

export default rootReducer;
