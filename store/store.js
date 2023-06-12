import { createStore, applyMiddleware  } from 'redux';
import rootReducer from './reducers'; // Importa el rootReducer que contendrá tus reducers combinados
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer, // Aquí va tu combinación de reducers
  applyMiddleware(thunk)
); // Crea la store con los reducers combinados

export default store;
