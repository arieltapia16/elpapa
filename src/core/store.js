import { createStore } from 'redux'; // create a store to store the reducers (REDUX)
import rootReducer from './Reducers'; // The reducer root

const Store = createStore(rootReducer);

export default Store;
