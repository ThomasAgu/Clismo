import { createStore } from 'redux';
import rootReducer from './reducers'; // Importa el rootReducer que contendrá tus reducers combinados

const store = createStore(rootReducer); // Crea la store con los reducers combinados

export default store;
